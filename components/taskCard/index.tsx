import { TaskCardProps } from "@/interfaces/TaskCard";
import theme from "@/themes/theme";
import { View, Text, ScrollView, Pressable, Animated, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { CheckFat, Pencil, TrashSimple } from "phosphor-react-native";
import { useState, useEffect, useRef, useContext } from "react";
import { TaskContext } from "@/context/task_context";
import { Task } from "@/@clean/shared/domain/entities/task";

export const TaskCard = (props: TaskCardProps) => {
    const { height } = Dimensions.get('window');
    const [selected, setSelected] = useState(false);
    const [isActive, setIsActive] = useState(props.status === 'ACTIVE'); // Estado para armazenar o status da tarefa
    const slideAnim = useRef(new Animated.Value(-50)).current; // Valor inicial fora da tela
    const { update } = useContext(TaskContext);
    const { deleteTask } = useContext(TaskContext);

    async function changeStatus() {
        const newStatus = isActive ? 'INACTIVE' : 'ACTIVE'; // Novo status a ser definido
        const tempTask = new Task(null, props.title, null, props.time, props.description, null, null, newStatus);
        console.log(tempTask);
        const response = await update(props.id, tempTask);
        console.log(response);

        if (response && response.message === "task updated") {
            setIsActive(!isActive); // Atualiza o status da tarefa
        }
    }

    async function handleDeleteTask() {
        const response = await deleteTask(props.id);
        console.log(response);
    }

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: selected ? 0 : -50, // Desliza para 0 quando selecionado, volta para -50 quando não
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [selected]);

    return (
        <View style={{ flexDirection: "row", justifyContent: 'center', position: 'relative' }}>
            <View style={{ width: '8%', height: height / 100 * 8, backgroundColor: props.color, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, zIndex: 1, display: "flex", justifyContent: "center" }}>
                {selected ?
                    <TouchableOpacity onPress={() => handleDeleteTask()}>
                        <TrashSimple size={24} color={theme.COLORS.BLACK} style={{ marginTop: 1 }} />
                    </TouchableOpacity>
                    : <></>
                }
            </View>
            <Pressable
                onPress={() => setSelected(!selected)}
                style={{
                    width: '85%',
                    height: height / 100 * 8,
                    backgroundColor: props.color2,
                    borderTopRightRadius: 12,
                    borderBottomRightRadius: 12,
                    paddingStart: 4,
                    paddingTop: 4,
                    zIndex: 1,
                }}
            >
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ width: '70%', color: props.color2 === '#000' || props.color2 === '#000000' ? theme.COLORS.WHITE : theme.COLORS.BLACK, fontWeight: "bold" }}>{props.title}</Text>
                    <Text style={{ width: '30%', color: props.color2 === '#000' || props.color2 === '#000000' ? theme.COLORS.WHITE : theme.COLORS.BLACK, fontWeight: "bold" }}>{props.time}</Text>
                </View>
                <ScrollView style={{ maxHeight: height / 100 * 6 }}>
                    <Text style={{ color: props.color2 === '#000' || props.color2 === '#000000' ? theme.COLORS.WHITE : theme.COLORS.BLACK }}>
                        {props.description === null ? 'Sem descrição' : props.description}
                    </Text>
                </ScrollView>
                {!isActive && (
                    <View style={{
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderTopRightRadius: 12,
                        borderBottomRightRadius: 12,
                    }} />
                )}
            </Pressable>
            <Animated.View style={{
                width: '15%',
                height: height / 100 * 8,
                backgroundColor: theme.COLORS.WHITE,
                borderTopRightRadius: 12,
                borderBottomRightRadius: 12,
                position: 'absolute',
                right: -15,
                flexDirection: "column",
                alignItems: "flex-end",
                padding: 3,
                gap: 4,
                transform: [{
                    translateX: slideAnim
                }],
            }}>
                <TouchableOpacity onPress={() => changeStatus()}>
                    <CheckFat size={24} color={theme.COLORS.GREEN_200} style={{ marginTop: 1 }} />
                </TouchableOpacity>
                <View style={{ width: '100%', height: 1, backgroundColor: theme.COLORS.BLACK }}></View>
                <Pencil size={24} color={theme.COLORS.MAIN} style={{}} />
            </Animated.View>
        </View>
    );
}
