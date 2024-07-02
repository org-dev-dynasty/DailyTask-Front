import { CaretDown, CaretUp } from "phosphor-react-native";
import { Container, LabelContainer, LabelText, LabelView } from "./styles";
import { Animated, FlatList, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import Task, { TaskProps } from "../tasks";
import theme from "@/themes/theme";


export type ItemProps = {
    label: string;
    tasks: TaskProps[];
}

export default function CalendarTasks({ label, tasks }: ItemProps) {
    const [expanded, setExpanded] = useState(false);
    const [height] = useState(new Animated.Value(70));

    const toggleExpandLabel = () => {
        if (expanded) {
            Animated.timing(height, {
                toValue: 70,
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(height, {
                toValue: 70,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
        setExpanded(!expanded);
    };

    return (
        <>
            <Container>
                <LabelContainer style={{ height }}>
                    <LabelView>
                        <LabelText>{label}</LabelText>
                        <TouchableOpacity onPress={toggleExpandLabel}>
                            {expanded ? (
                                <CaretUp size={24} color={theme.COLORS.WHITE} />
                            ) : (
                                <CaretDown size={24} color={theme.COLORS.WHITE}  />
                            )}
                        </TouchableOpacity>
                    </LabelView>
                    <View style={{ width: '100%' }}>
                        {tasks.length > 0 && (
                            <Task
                                title={tasks[0].title}
                                hour={tasks[0].hour}
                                description={tasks[0].description}
                                color={tasks[0].color}
                                secondaryColor={tasks[0].secondaryColor}
                            />
                        )}
                        {expanded && tasks.slice(1).map((task, index) => (
                            <Task
                                key={index}
                                title={task.title}
                                hour={task.hour}
                                description={task.description}
                                color={task.color}
                                secondaryColor={task.secondaryColor}
                            />
                        ))}
                    </View>
                </LabelContainer>
            </Container>
        </>
    );
}
