import styled from "styled-components/native";
import theme from "@/themes/theme";
import { Calendar } from 'react-native-calendars';
import { Animated } from "react-native";

export const CalendarContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  flex-direction: column;
  align-items: center;
`;

export const CalendarComponent = styled(Calendar)`
  background-color: transparent;
`;

export const Bar = styled.TouchableOpacity`
    width: 45%;
    height: 10px;
    margin-top: 10px;
    border-radius: 360px;
`;

export const TasksContainer = styled.View`
    position: absolute;
    top: 50%;
    width: 100%;
    padding: 20px;
    flex-direction: column;
    margin-top: 20px;
`;

export const TaskLabel = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
`;

export const TextLabel = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.LG};
    font-weight: ${theme.FONT_FAMILY.MEDIUM};
    margin-right: 10px;
`;

export const OnlyDisabledView = styled.Text`
    justify-content: flex-start;
    align-items: flex-start;
    padding-top: 10%;
    flex: 1;
`;

export const OnlyDisabledTextsView= styled.Text`
    width: 80%;
`;

export const OnlyDisabledTitle = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.LG};
    font-weight: ${theme.FONT_FAMILY.MEDIUM};
`;

export const OnlyDisabledText = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.SM};
    font-weight: ${theme.FONT_FAMILY.REGULAR};
`;
