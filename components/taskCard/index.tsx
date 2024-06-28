import React, { useState } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Icon, TaskBody, TaskContainer, TaskHeader, TaskText } from './styles';

export const TaskCard = ({ title, color, content }: any) => {
  const [expanded, setExpanded] = useState(false);
  const [height] = useState(new Animated.Value(150));

  const toggleExpand = () => {
    if (expanded) {
      Animated.timing(height, {
        toValue: 50,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(height, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setExpanded(!expanded);
  };

  return (
    <TaskContainer style={[{ backgroundColor: color, height }]}>
      <TouchableOpacity onPress={toggleExpand}>
        <TaskHeader>
          <TaskText>{String(title)}</TaskText>
          <Icon>
            <MaterialIcons name={expanded ? 'expand-less' : 'expand-more'} size={24} color="white" />
          </Icon>
        </TaskHeader>
      </TouchableOpacity>
      {expanded && (
        <TaskBody>
          <TaskText>{String(content)}</TaskText>
        </TaskBody>
      )}
    </TaskContainer>  
  );
};
