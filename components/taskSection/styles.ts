import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const SectionContainer = styled.View`
  margin-bottom: 20px;
  width: 70%;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #333;
  border-radius: 10px;
`;

export const SectionLabel = styled.Text`
  color: white;
  font-size: 16px;
  margin-right: 10px;
  margin-bottom: 15px;
`;

export const Icon = styled.View`
  padding-left: 10px;
`;

export const TaskList = styled(Animated.View)`
  overflow: hidden;
`;

export const TaskContainer = styled(Animated.View)`
  height: 50px;
  border-radius: 10px;
  margin-bottom: 10px;
  padding: 10px;
  justify-content: space-between;
`;

export const TaskText = styled.Text`
  color: white;
  font-size: 14px;
`;

export const ActionContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  right: 10px;
`;

export const ActionIcon = styled.TouchableOpacity`
  margin-left: 10px;
`;
