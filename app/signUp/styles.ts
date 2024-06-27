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
    margin-top: 21px;
    width: 162px;
    height: 30px;
    font-family: ${theme.FONT_FAMILY.MEDIUM}; 
    font-size: ${theme.FONT_SIZE.MD};
    border-radius: 10px;
    align-items: center;  
    justify-content: center; 
    align-items: center; 
`;

export const Text = styled.Text`
    font-family: ${theme.FONT_FAMILY.MEDIUM}; 
    font-size: ${theme.FONT_SIZE.MD};
    color: ${theme.COLORS.WHITE};
    margin-top: 21px;
`;

export const TextLink = styled.Text`
    color: ${theme.COLORS.MAIN};
`;

export const TextFooter = styled.Text`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD};    
    color: ${theme.COLORS.WHITE};
    margin-top: 65px;
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
    margin-bottom: 15px;
    width: 240px;
`;

