import styled from "styled-components/native";
import theme from "@/themes/theme";
import { Calendar } from 'react-native-calendars';

export const CalendarContainer = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  background-color: #310842;
  border-radius: 20px;
  padding: 20px;
  flex-direction: column;
  align-items: center;
`;

export const CalendarComponent = styled(Calendar)`
  background-color: transparent;
`;

export const Bar = styled.View`
    width: 45%;
    height: 10px;
    background-color: ${theme.COLORS.WHITE};
    margin-top: 10px;
    border-radius: 360px;
`;

export const TasksContainer = styled.View`
    position: absolute;
    top: 50%;
    width: 90%;
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
