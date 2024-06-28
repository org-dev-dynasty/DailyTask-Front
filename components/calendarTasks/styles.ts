import { Animated } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  padding: 15px;
  height: 50%;
`;


export const LabelContainer = styled(Animated.View)`
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 5px;
  margin-bottom: 10px;
  width: 100%
`;

export const LabelView = styled.View`
    flex-direction: row;
    width: 100%;
    gap: 10px;
`

export const LabelText = styled.Text`
  color: white;
  font-size: 16px;
`