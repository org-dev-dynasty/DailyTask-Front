import styled from "styled-components/native";
import theme from "@/themes/theme";
import { Link } from "expo-router";

export const Title = styled.Text`
    align-items: center;
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.XL};
    padding-bottom: 20px;
    text-align: center;
    padding-top: 20px;
`;

export const ButtonOut = styled.TouchableOpacity`
    position: absolute;
    top: 10px; 
    right: 10px;
    z-index: 2;
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

export const ButtonDelete = styled.TouchableOpacity`
    background-color: ${theme.COLORS.NEGATIVE};
    width: 162px;
    height: 35px;
    border-radius: 10px;
    margin-top: 45px;
    align-items: center;
    justify-content: center;
    align-self: center;
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
