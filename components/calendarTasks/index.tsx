import { CaretDown } from "@phosphor-icons/react";
import { Container, LabelText, LabelView, TaskDescription, TaskDescriptionText, TaskHeader, TaskText } from "./styles";
import { FlatList, TouchableOpacity, View } from "react-native"

type ItemProps = {
    id: number;
    label: string;
    title: string;
    hour?: string;
    description?: string;
    color?: string;
  }

export default function CalendarTasks({ label, hour, title, description, color }: ItemProps) {
    return (
        <>
            <Container>
                <LabelView>
                    <LabelText>{label}</LabelText>
                        <TouchableOpacity>
                            <CaretDown size={24} style={{ color: 'white' }} />
                        </TouchableOpacity>
                </LabelView>
                <View style={{ backgroundColor: color  }}>
                    <TaskHeader>
                        <TaskText>{title}</TaskText>
                        <TaskText>{hour}</TaskText>
                        <TouchableOpacity>
                            <CaretDown size={24} style={{ color: 'white' }} />
                        </TouchableOpacity>
                    </TaskHeader>
                    <TaskDescription>
                        <TaskDescriptionText>{description}</TaskDescriptionText>
                    </TaskDescription>
                </View>
            </Container>
        </>
    )
}