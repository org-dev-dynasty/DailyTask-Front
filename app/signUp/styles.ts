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

export const CheckBoxContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const CheckBoxText = styled.Text`
    font-family: ${theme.FONT_FAMILY.LIGHT};
    font-size: ${theme.FONT_SIZE.XS};
    color: ${theme.COLORS.WHITE};
`;

export const CheckBoxTextTermsTouchable = styled.TouchableOpacity`
    flex-direction: row;
    align-items: flex-end;
`;

export const CheckBoxTextTerms = styled.Text`
    font-family: ${theme.FONT_FAMILY.LIGHT};
    font-size: ${theme.FONT_SIZE.XS};
    color: ${theme.COLORS.MAIN};
    text-decoration-line: underline;
`;

export const ModalContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 20;
    width: 100%;
    height: 100%;
`;

export const ModalView = styled.View`
    margin: 20px;
    width: 80%;
    height: 70%;
    background-color: ${theme.COLORS.NEGATIVE_ALT};
    border-width: 2px;
    border-color: ${theme.COLORS.WHITE};
    border-radius: 20px;
    padding: 35px;
    align-items: center;
`;

export const ModalText = styled.Text`
    font-family: ${theme.FONT_FAMILY.MEDIUM};
    font-size: ${theme.FONT_SIZE.MD};
    color: ${theme.COLORS.WHITE};
    text-align: center;
`;