import React, { useState } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SectionContainer, SectionHeader, SectionLabel, Icon, TaskList } from './styles';
import { TaskCard } from '../taskCard';

export const TaskSection = ({ label, tasks }: any) => {
    const [expanded, setExpanded] = useState(false);
    const [height] = useState(new Animated.Value(50));

    const toggleExpand = () => {
        if (expanded) {
            Animated.timing(height, {
                toValue: 50,
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(height, {
                toValue: tasks.length * 70 + 50,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
        setExpanded(!expanded);
    };

    return (
        <SectionContainer>
            <TouchableOpacity onPress={toggleExpand}>
                <View style={{ flexDirection: 'row' }}>
                    <SectionLabel>{label}</SectionLabel>
                    <Icon>
                        <MaterialIcons name={expanded ? 'expand-less' : 'expand-more'} size={24} color="white" />
                    </Icon>
                </View>
            </TouchableOpacity>
            <TaskList style={{ height }}>
                {tasks.map((task: any, index: any) => (
                    <TaskCard key={index} title={task.title} color={task.color} content={task.content} />
                ))}
            </TaskList>
            {expanded && (
                <TaskList style={{ height }}>
                    {tasks.map((task: any, index: any) => (
                        <TaskCard key={index} title={task.title} color={task.color} content={task.content} />
                    ))}
                </TaskList>
            )}
        </SectionContainer>
    );
};
