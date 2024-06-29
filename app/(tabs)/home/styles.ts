import styled from "styled-components/native";
import theme from "@/themes/theme";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  margin: 0;
  top: 32px;
  padding: 0;
  padding-top: 40px;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const TopViewText = styled.View`
    padding: 0;
    top: 20%;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const Title = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.XL};
`;

export const InitialScreen = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    z-index: 1;
`;

export const Line = styled.View`
    width: 35%;
    height: 1px;
    background-color: ${theme.COLORS.WHITE};
`;

export const MiddleContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
`;

export const TextMiddle = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD};
    margin: 0 10px;
    padding-bottom: 2px;
`;

export const TopViewLock = styled.View`
    padding: 0;
    top: 0;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const LockIcon = styled.View`
    width: 100px;
    height: 100px;
    background-Color: ${theme.COLORS.MAIN};
    border-Radius: 90px;
    justify-Content: center;
    align-Items: center;
`;

export const RecordingTime = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.XL};
`;

export const RecordingTextInput = styled.View`
    width: 80%;
    background-color: ${theme.COLORS.WHITE};
    border-radius: 15px;
    padding: 10px;
    margin: 20px 0;
`;

export const RecordingTextInputText = styled.TextInput.attrs({
    multiline: true,
    maxLength: 1200,
    numberOfLines: 1,
    scrollEnabled: true,
})`
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD};
    color: ${theme.COLORS.BLACK};
    height: auto;
    max-height: 100px;
`;