import styled from 'styled-components/native';
import theme from "@/themes/theme";
import {LinearGradient} from "expo-linear-gradient";

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

export const ButtonsView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
    width: 90%;
    align-self: center;
`;

export const ConfirmButton = styled.TouchableOpacity`
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
`

export const ButtonTxt = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    align-self: center;
`;