import theme from "@/themes/theme";
import styled from "styled-components/native";

export const Logo = styled.Image` 
    margin-top: 100px;
    margin-bottom: 70px;
`;

export const ViewFooter = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    margin-top: 200px;
    margin-bottom: 40px;
`;

export const TextFooter = styled.Text`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD};    
    color: ${theme.COLORS.WHITE};
    padding-bottom: 14px;
`;

export const MainText = styled.Text`
    font-family: ${theme.FONT_FAMILY.MEDIUM};
    font-size: ${theme.FONT_SIZE.XL};
    color: ${theme.COLORS.WHITE};
    margin-bottom: 20px;
    text-align: center;
`;

export const SecondText = styled.Text`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD};
    color: ${theme.COLORS.WHITE};
    margin-bottom: 20px;
    text-align: center;
`;

export const CharInput = styled.TextInput`
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-width: 2px;
    border-color: ${theme.COLORS.WHITE};
    border-radius: 10px;
    text-align: center;
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD};
`;

export const ButtonText = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.MEDIUM}; 
    font-size: ${theme.FONT_SIZE.MD};
`;

export const SendButton = styled.TouchableOpacity`
    background-color: ${theme.COLORS.MAIN};
    width: 162px;
    height: 30px;
    font-family: ${theme.FONT_FAMILY.MEDIUM}; 
    font-size: ${theme.FONT_SIZE.MD};
    border-radius: 10px; 
    align-items: center; 
    justify-content: center;
`;

export const BackButton = styled.TouchableOpacity`
    background-color: ${theme.COLORS.NEGATIVE};
    width: 162px;
    height: 30px;
    font-family: ${theme.FONT_FAMILY.MEDIUM}; 
    font-size: ${theme.FONT_SIZE.MD};
    border-radius: 10px; 
    align-items: center; 
    justify-content: center;
`;

export const Container = styled.View`
    flex: 1;
    justify-content: flex-start;  
    align-items: center;
    text-align: center;
`;

export const TextsContainer = styled.View`
    width: 60%;
    text-align: center;
`;

export const InputsContainer = styled.View`
    width: 80%;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
    flex-direction: row;
`;

export const ButtonContainer = styled.View`
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;