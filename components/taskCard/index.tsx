import { TaskCardProps } from "@/interfaces/TaskCard";
import theme from "@/themes/theme";
import { View, Text, ScrollView, Pressable, Animated, Dimensions } from "react-native";
import { CheckFat, Pencil } from "phosphor-react-native";
import { useState, useEffect, useRef, useContext } from "react";
import { TaskContext } from "@/context/task_context";
import { Task } from "@/@clean/shared/domain/entities/task";

export const TaskCard = (props: TaskCardProps) => {
    const { width, height } = Dimensions.get('window');
    const [selected, setSelected] = useState(false);
    const slideAnim = useRef(new Animated.Value(-50)).current; // Valor inicial fora da tela
    const { get } = useContext(TaskContext);

    async function getTaskId(task_id: string) {
        const response = await get(task_id);
        console.log(response);
    }

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: selected ? 0 : -50, // Desliza para 0 quando selecionado, volta para -50 quando não
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [selected]);

    useEffect(() => { 
        getTaskId(props.task_id);
    }, []);

    return (
        <View style={{flexDirection: "row", justifyContent: 'center'}}>
            <View style={{width: '8%', height: height/100*8, backgroundColor: props.color, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, zIndex: 1}}></View>
            <Pressable 
                onPress={() => setSelected(!selected)} 
                style={{width: '85%', height: height/100*8, backgroundColor: props.color2, borderTopRightRadius: 12, borderBottomRightRadius: 12, paddingStart: 4, paddingTop: 4, zIndex: 1}}
            >
                <Text>{props.title}</Text>
                <ScrollView style={{maxHeight: height/100*6}}>
                    <Text>{props.description}</Text>
                </ScrollView>
            </Pressable>
            <Animated.View style={{
                width: '15%', 
                height: height/100*8, 
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
                <CheckFat size={24} color={theme.COLORS.GREEN_200} style={{marginTop: 1}} />
                <View style={{width: '100%', height: 1, backgroundColor: theme.COLORS.BLACK}}></View>
                <Pencil size={24} color={theme.COLORS.MAIN} style={{}} />
            </Animated.View>
        </View>
    );
}
