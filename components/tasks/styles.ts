import { Animated } from "react-native";
import styled from "styled-components/native";

export const TaskContainer = styled.View`
  flex-direction: row;
  border-radius: 10px;
  overflow: hidden;
`;

export const ColorSection = styled.View`
  width: 7%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const MainSection = styled.View`
  width: 85%;
  padding: 5px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;


export const TaskHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 100%;
`;

export const TaskText = styled.Text`
  color: white;
  font-size: 14px;
`;

export const TaskDescription = styled(Animated.View)`
  padding: 10px;
  overflow: hidden;
`;

export const TaskDescriptionText = styled.Text`
  color: white;
`;