import { Animated, TouchableOpacity, View } from "react-native";
import { TaskDescription, TaskDescriptionText, TaskHeader, TaskText, TaskContainer, ColorSection, MainSection } from "./styles";
import { CaretDown, CaretUp } from "phosphor-react-native";
import { useState } from "react";
import theme from "@/themes/theme";

export type TaskProps = {
    title: string;
    hour?: string;
    description?: string;
    color?: string;
    secondaryColor?: string;
}

export default function Task({ hour, title, description, color, secondaryColor }: TaskProps) {
    const [expanded, setExpanded] = useState(false);
    const [height, setHeight] = useState(new Animated.Value(50));

    const toggleExpandCard = () => {
        if (expanded) {
            Animated.timing(height, {
                toValue: 50,
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(height, {
                toValue: 120, 
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
        setExpanded(!expanded);
    };

    return (
        <Animated.View style={{ height, marginBottom: 20 }}>
            <TaskContainer>
                <ColorSection style={{ backgroundColor: secondaryColor }} />    
                <MainSection style={{ backgroundColor: color }}>
                    <TaskHeader>
                        <TaskText>{title}</TaskText>
                        <TaskText style={{ marginHorizontal: 10 }}>{hour}</TaskText>
                        <TouchableOpacity onPress={toggleExpandCard}>
                            {expanded ? (
                                <CaretUp size={24} color={theme.COLORS.WHITE} />
                            ) : (
                                <CaretDown size={24} color={theme.COLORS.WHITE} />
                            )}
                        </TouchableOpacity>
                    </TaskHeader>
                    {expanded && (
                        <TaskDescription>
                            <TaskDescriptionText>{description}</TaskDescriptionText>
                        </TaskDescription>
                    )}
                </MainSection>
            </TaskContainer>
        </Animated.View>
    );
}
