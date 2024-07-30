import styled from 'styled-components/native';
import theme from "@/themes/theme";


export const CenteredView = styled.View`
  align-items: center;
  margin: 0 57px;
  width: 100%;
`;

export const LogoImage = styled.Image`
  margin-top: 100px;
  margin-bottom: 70px;
`;

export const Title = styled.Text`
  font-size: ${theme.FONT_SIZE.XL};
  color: ${theme.COLORS.WHITE};
  margin: 0 141px;
  margin-bottom: 23px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const InputView = styled.View`
  width: 75%;
  margin: 0 70px;
  gap: 10px
`;

export const ForgotPasswordText = styled.Text`
  color: ${theme.COLORS.MAIN};
  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.SM};  
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: ${theme.COLORS.MAIN};
  border-radius: 10px;
  padding: 7px 60px;
  margin-top: 15px;
  width: 50%;
  align-items: center;
`;

export const LoginButtonText = styled.Text`
  color: ${theme.COLORS.WHITE};
  font-size: ${theme.FONT_SIZE.MD};
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const SeparatorContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
`;

export const SeparatorLine = styled.View`  
  flex: 1;
  height: 1px;
  width: 150px;
  margin: 0 10px;
  max-width: 150px;
  border: 1px;
`;

export const SeparatorText = styled.Text`
  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.SM};
`;

export const SocialIcons = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  gap: 50px;
`;

export const SignUpLink = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const SignUpLinkText = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const DevDynastyText = styled.Text`
    color: ${theme.COLORS.WHITE};
    margin-top: 100px;
`;