import styled from "styled-components/native";
import theme from "@/themes/theme";
import { Link } from "expo-router";

export const Container = styled.View`
    flex: 1;
    align-items: center;
`;

export const UserImage = styled.View`
    margin-top: 128px;
`;

export const NameUser = styled.Text`
    font-family: ${theme.FONT_FAMILY.LIGHT};
    font-size: ${theme.FONT_SIZE.LG};
    padding-top: 27px;
`;

export const EmailUser = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-style: italic;
    font-size: ${theme.FONT_SIZE.SM};
`;

export const ButtonChangeEmail = styled.TouchableOpacity`
    background-color: ${theme.COLORS.MAIN};
    margin-top: 35px;
    width: 162px;
    height: 35px;
    border-radius: 10px;
`;

export const ButtonText = styled.Text`
    color: ${theme.COLORS.WHITE};
    padding: 6px 34px;
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.MEDIUM};
`;

export const ButtonChangePassword = styled.TouchableOpacity`
    background-color: ${theme.COLORS.MAIN};
    width: 162px;
    height: 35px;
    border-radius: 10px;
    margin-top: 27px;
`;

export const ButtonDeleteAccount = styled.TouchableOpacity`
    background-color: ${theme.COLORS.NEGATIVE};
    width: 162px;
    height: 35px;
    border-radius: 10px;
    margin-top: 27px;
`;

export const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.View`
    width: 90%;
    height: 360px; 
    border-radius: 10px;
    padding: 0px;
`;

export const TitleModal = styled.Text`
    align-items: center;
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.XL};
    padding-bottom: 20px;
    text-align: center;
    padding-top: 20px;
`;

export const Subtitle = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    margin-bottom: 15px;
    width: 100%;
    align-items: center;
    justify-self: center;
    text-align: center;
`;

export const ButtonModal = styled.TouchableOpacity`
    background-color: ${theme.COLORS.MAIN};
    width: 162px;
    height: 35px;
    border-radius: 10px;
    margin-top: 45px;
    align-items: center;
    justify-content: center;
    align-self: center;
`;

export const ButtonTextModal = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.MEDIUM};
    font-size: ${theme.FONT_SIZE.MD};
`;

export const ButtonOut = styled.TouchableOpacity`
    position: absolute;
    top: 10px; /* Ajuste conforme necessário para o espaçamento do topo */
    right: 10px; /* Ajuste conforme necessário para o espaçamento da direita */
`;

export const ButtonModalDelete = styled.TouchableOpacity`
    background-color: ${theme.COLORS.NEGATIVE};
    width: 162px;
    height: 35px;
    border-radius: 10px;
    margin-top: 45px;
    align-items: center;
    justify-content: center;
    align-self: center;
`;

export const ViewButtons = styled.View`
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
`;

export const Logout = styled.TouchableOpacity`
    position: absolute;
    top: 55px;
    right: 20px;
    z-index: 1;
`;

export const ViewSwitch = styled.View`
    margin-top: 27px;
    
    transform: scaleX(1.3) scaleY(1.3);
    flex-direction: row;
    align-items: center;
`;