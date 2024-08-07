import styled from "styled-components/native";
import theme from "@/themes/theme";
import { Animated } from "react-native";

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    margin: 0;
    top: 32px;
    padding: 40px 0 0;
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

export const InitialScreen = styled(Animated.View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    z-index: 1;
`

export const CenterElementsDisplay = styled(Animated.View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50%;
    z-index: 1;
    position: absolute;
    top: 25%;
`;

export const KeyboardInitialView = styled(Animated.View)`
    height: 40%;
    flex: auto;
    justify-content: flex-start;
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
    line-height: 22px;
`;


export const TopViewLock = styled(Animated.View)`
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

export const LockPill = styled(Animated.View)`
    background-Color: ${theme.COLORS.MAIN};
    border-Radius: 90px;
`;

export const CircleAnimation = styled(Animated.View)`
    height: 100px;
    width: 100px;
    border-radius: 300px;
    position: absolute;
`;
export const SecondCircleAnimation = styled(Animated.View)`
    height: 200px;
    width: 200px;
    border-radius: 300px;
    position: absolute;
`;

export const CircleView = styled(Animated.View)`
    top: 25%;
    justify-content: center;
    align-items: center;
    z-index: -5;
`;

export const MicrophoneView = styled(Animated.View)`
    justify-content: flex-end;
    align-items: center;
    height: 40%;
    width: 100%;
`;

export const TimerView = styled(Animated.View)`
    height: 20%;
    justify-content: flex-end;
`;

export const RecordingTime = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.XL};
`;

export const RecordingTimeView = styled(Animated.View)`
    justify-content: flex-start;
    align-items: center;
    height: 40%;
    width: 100%;
`;

export const RecordingTextInput = styled(Animated.View)`
    width: 80%;
    background-color: ${theme.COLORS.WHITE};
    border-radius: 15px 15px 0 0;
    padding: 10px;
    margin-top: 10px;
    z-index: 1;
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

export const SendButton = styled.TouchableOpacity`
    background-color: ${theme.COLORS.MAIN};
    border-radius: 10px;
    padding: 6px 0;
    width: 40%;
    align-items: center;
`;

export const SendButtonText = styled.Text`
  color: ${theme.COLORS.WHITE};
  font-size: ${theme.FONT_SIZE.MD};
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const InputButtonsView = styled(Animated.View)`
    flex-direction: row;
    width: 80%;
`;

export const InputCancelButton = styled.TouchableOpacity`
    background-color: ${theme.COLORS.MAIN};
    border-radius: 0 0 0 10px;
    padding: 6px 0;
    align-items: center;
    flex: 1;
    border-right-width: 1px;
`;

export const InputEditButton = styled.TouchableOpacity`
    background-color: ${theme.COLORS.MAIN};
    padding: 6px 0;
    align-items: center;
    flex: 1;
    border-right-width: 1px;
    border-left-width: 1px;
`;

export const InputConfirmButton = styled.TouchableOpacity`
    background-color: ${theme.COLORS.MAIN};
    border-radius: 0 0 10px 0;
    padding: 6px 0;
    align-items: center;
    flex: 1;
    border-left-width: 1px;
`;

export const TrashView = styled(Animated.View)`
    flex: 1;
    position: absolute;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    left: 12%;
    height: 40%;
    width: 100px;
    z-index: -1;
`;