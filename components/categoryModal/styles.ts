import styled from 'styled-components/native';
import theme from "@/themes/theme";
import {LinearGradient} from "expo-linear-gradient";

interface ColorCircleProps {
    color: string;
    selected?: boolean;
}

export const ModalContainer = styled.View`
  flex: 1;  
  justify-content: center;
  align-items: center;  
  background-color: rgba(0, 0, 0, 0.4);
  padding: 5%;
`;

export const ModalContent = styled(LinearGradient)`
    width: 100%;
    align-items: center;
    border-radius: 15px;
    background-color: ${theme.COLORS.NEGATIVE_ALT};
    border: 2px solid ${theme.COLORS.WHITE};
    padding: 15px 3%;
`

export const Title = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-size: 24px;
    font-family: ${theme.FONT_FAMILY.MEDIUM};
`;

export const Subtitle = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.SM};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    margin: 10px 0;
    width: 90%;
    text-align: center;
`;

export const ColorTitle = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    margin-left: 15px;
`;

export const ColorsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

export const ColorCircle = styled.TouchableOpacity<ColorCircleProps>`
  width: 32px;
  height: 32px;
  border-radius: 20px;
  background-color: ${props => props.color};
  margin: 5px;
  border-width: ${props => (props.selected ? '3px' : '0')};
  border-color: ${props => (props.selected ? 'white' : 'transparent')};
`;

export const CustomColorText = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.SM};
    font-family: ${theme.FONT_FAMILY.MEDIUM};
`;

export const ConfirmButton = styled.TouchableOpacity`
    background-color: ${theme.COLORS.MAIN};
    width: 40%;
    border-radius: 10px;
    padding: 10px 20px;
    margin-top: 5px;
    align-items: center;
`;

export const ButtonTxt = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const ButtonsView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
    width: 90%;
    align-self: center;
`;

export const ConfirmButtonRow = styled.TouchableOpacity`
    background-color: ${theme.COLORS.MAIN};
    border-radius: 10px;
    align-items: center;
    padding: 5px 0;
    width: 47%;
`;

export const CancelButton = styled.TouchableOpacity`
    background-color: ${theme.COLORS.NEGATIVE_ALT};
    border-radius: 10px;
    align-items: center;
    padding: 5px 0;
    width: 47%;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const PickerColorCircle = styled.TouchableOpacity<ColorCircleProps>`
    width: 32px;
    height: 32px;
    border-radius: 20px;
    background-color: ${props => props.color};
    margin-inline: 5px;
    border-width: 3px;
    border-color: white;
`;