import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Section = styled.View`
  margin-bottom: 20px;
  width: 70%;
`;

export const TaskContainer = styled(Animated.View)`
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: hidden;
`;

export const TaskHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const TaskBody = styled.View`
  padding: 10px;
`;

export const TaskText = styled.Text`
  color: white;
  font-size: 14px;
`;

export const Icon = styled.View`
  padding-left: 10px;
`;
