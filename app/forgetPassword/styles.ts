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

export const Container = styled.View`
    flex: 1;
    justify-content: flex-start;  
    align-items: center;      
`;

export const Text = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD};
    width: 250px;
    margin-top: 6px;
    text-align: center;
`;

export const View = styled.View`
    margin-top: 16px;
    width: 250px;
`;

export const TouchableOpacityEnviar = styled.TouchableOpacity`
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

export const TextLink = styled.Text`
    font-family: ${theme.FONT_FAMILY.MEDIUM}; 
    font-size: ${theme.FONT_SIZE.MD};
    color: ${theme.COLORS.WHITE};
    margin-top: 21px;
`;

export const TextFooter = styled.Text`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD};    
    color: ${theme.COLORS.WHITE};
    padding-bottom: 14px;
`;

export const ViewFooter = styled.View`
    position: absolute;
    bottom: 0;
    align-items: center;
    padding-bottom: 40px;
`;