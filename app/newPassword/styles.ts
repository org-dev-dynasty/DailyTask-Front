import styled from 'styled-components/native';
import theme from '@/themes/theme';

export const Logo = styled.Image` 
    margin-top: 100px;
    margin-bottom: 70px;
`;

export const Titulo = styled.Text`
    font-size: ${theme.FONT_SIZE.XL};
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.MEDIUM};
`;

export const TextInfo = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD};
    width: 250px;
    margin-top: 6px;
    text-align: center;
`;

export const Container = styled.View`
    flex: 1;
    justify-content: flex-start;  
    align-items: center;
    width: 100%;
    padding: 0;
    margin: 0%;
`;

export const TextContainer = styled.View`
    width: 100%;
    padding: 16px;
    flex-direction: column;
    justify-content: flex-start;  
    align-items: center;
`;

export const InputContainer = styled.View`
    width: 70%;
`;

export const Footer = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    margin-top: 50%;
    margin-bottom: 40px;
`;

export const TextFooter = styled.Text`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD};    
    color: ${theme.COLORS.WHITE};
    padding-bottom: 14px;
`;

export const Button = styled.TouchableOpacity`
    color: ${theme.COLORS.WHITE};
    background-color: ${theme.COLORS.MAIN};
    width: 162px;
    height: 30px;
    font-family: ${theme.FONT_FAMILY.MEDIUM}; 
    font-size: ${theme.FONT_SIZE.MD};
    border-radius: 10px; 
    align-items: center; 
    justify-content: center;
    margin-bottom: 20px;
`;

export const TextButton = styled.Text`
    font-family: ${theme.FONT_FAMILY.MEDIUM}; 
    font-size: ${theme.FONT_SIZE.MD};
    color: ${theme.COLORS.WHITE};
`;
