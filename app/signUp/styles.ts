import styled from 'styled-components/native';
import theme from '@/themes/theme';

export const Titulo = styled.Text`
    font-size: ${theme.FONT_SIZE.XL};
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.MEDIUM};
    padding-top: 65px;
`;

export const Container = styled.View`
    flex: 1;
    justify-content: flex-start;  
    align-items: center;      
`;

export const TouchableOpacityConta = styled.TouchableOpacity`
    color: ${theme.COLORS.WHITE};
    background-color: ${theme.COLORS.MAIN};
    width: 162px;
    height: 30px;
    font-family: ${theme.FONT_FAMILY.MEDIUM}; 
    font-size: ${theme.FONT_SIZE.MD};
    border-radius: 10px;
    align-items: center;  
    justify-content: center; 
    align-items: center; 
    margin-bottom: 20px;
`;

export const ContainerLogin = styled.TouchableOpacity`
    font-family: ${theme.FONT_FAMILY.MEDIUM}; 
    font-size: ${theme.FONT_SIZE.MD};
    color: ${theme.COLORS.WHITE};
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const TextContainerLogin = styled.Text`
    font-family: ${theme.FONT_FAMILY.MEDIUM};
    font-size: ${theme.FONT_SIZE.MD};
    color: ${theme.COLORS.WHITE};
    text-align: center;
`;

export const Details = styled.Text`
    color: ${theme.COLORS.MAIN};
`;

export const ButtonText = styled.Text`
    font-family: ${theme.FONT_FAMILY.MEDIUM}; 
    font-size: ${theme.FONT_SIZE.MD};
    color: ${theme.COLORS.WHITE};
`;

export const TextLink = styled.Text`
    color: ${theme.COLORS.MAIN};
`;

export const TextFooter = styled.Text`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD};    
    color: ${theme.COLORS.WHITE};
    padding-bottom: 14px;
`;

export const Logo = styled.Image`
    margin-top: 100px;
`;

export const ErrorMessage = styled.Text`
  color: ${theme.COLORS.RED_200};
  font-family: ${theme.FONT_FAMILY.MEDIUM};
  font-size: ${theme.FONT_SIZE.MD};
  margin-top: 6px;
`;

export const View = styled.View`
    width: 240px;
`;

export const Footer = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 40px;
`;