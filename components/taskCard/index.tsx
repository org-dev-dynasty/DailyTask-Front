import { TaskCardProps } from "@/interfaces/TaskCard";
import theme from "@/themes/theme";
import { View, Text, ScrollView, Pressable, Animated, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { CheckFat, Pencil, TrashSimple } from "phosphor-react-native";
import { useState, useEffect, useRef } from "react";

export const TaskCard = (props: TaskCardProps) => {
    const { height } = Dimensions.get('window');
    const [selected, setSelected] = useState(false);
    const slideAnim = useRef(new Animated.Value(-50)).current; // Valor inicial fora da tela

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: selected ? 0 : -50, // Desliza para 0 quando selecionado, volta para -50 quando não
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [selected]);

    const isActive = props.status === 'ACTIVE';

    return (
        <View style={{ flexDirection: "row", justifyContent: 'center', position: 'relative', width: '90%', marginHorizontal: 'auto' }}>
            <View style={{ width: '8%', height: height / 100 * 8, backgroundColor: props.color, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, zIndex: 1, display: "flex", justifyContent: "center"}}>
                {selected ?
                <TouchableOpacity>
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
                <CheckFat size={24} color={theme.COLORS.GREEN_200} style={{ marginTop: 1 }} />
                <View style={{ width: '100%', height: 1, backgroundColor: theme.COLORS.BLACK }}></View>
                <Pencil size={24} color={theme.COLORS.MAIN} style={{}} />
            </Animated.View>
        </View>
    );
}
