import styled from "styled-components/native";
import theme from "@/themes/theme";
import {Animated, Dimensions, Modal} from "react-native";

const { width, height } = Dimensions.get('window');

interface SwitchProps {
    isOn: boolean;
}

export const ModalView = styled(Modal).attrs({
    transparent: true,
    animationType: "slide"
})`
    flex: 1;
    justify-content: center;
`;

export const ShadeView = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 2;
`;

export const Container = styled.View`
    flex: 1;
    width: 90%;
    position: absolute;
    z-index: 3;
    top: 10%;
    border: 2px white;
    border-radius: 15px;
    align-self: center;
    overflow: hidden
`;

export const InputModalView = styled.View`
    width: 90%;
    align-self: center;
    margin-top: 10px;
`;

export const SmallInputModalView = styled.View`
    width: 45%;
    margin-top: 10px;
`;

export const TopInputModalView = styled.View`
    margin-top: 20px;
    width: 90%;
    align-self: center;
`;

export const ModalText = styled.Text`
    margin-top: 5px;
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD};
`;

export const TextModalView = styled.View`
    width: 90%;
    align-self: center;
`;

export const ButtonsView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
    width: 90%;
    align-self: center;
`;

export const ConfirmButton = styled.TouchableOpacity`
    background-color: ${theme.COLORS.MAIN};
    border-radius: 10px;
    align-items: center;
    padding: 5px 0;
    width: 47%;
`;

export const CancelButton = styled.TouchableOpacity`
    background-color: ${theme.COLORS.NEGATIVE_ALT};
    border-radius: 10px;
    align-items: center;
    padding: 5px 0;
    width: 47%;
`;

export const ButtonTxt = styled.Text`
  color: ${theme.COLORS.WHITE};
  font-size: ${theme.FONT_SIZE.MD};
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const DisclaimerTxt = styled.Text`
  color: ${theme.COLORS.WHITE};
  font-size: ${theme.FONT_SIZE.XS};
  font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const DisclaimerView = styled.View`
    align-self: center;
    margin-top: 10px;
`;

export const TimeRepetitionView = styled(Animated.View)`
    flex-direction: row;
    margin: 0 5%;
    justify-content: space-between;
    align-items: center;
`;

export const RepetitionTxt = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.REGULAR};
`;

export const SwitchTouchable = styled.TouchableOpacity`
    width: 50px;
    height: 25px;
    border-radius: 15px;
    justify-content: center;
    padding: 2px;
`;

export const SwitchContainer = styled(Animated.View)`
    width: 100%;
    height: 100%;
    border-radius: 15px;
    justify-content: center;
    padding: 2px;
`;

export const SwitchKnob = styled(Animated.View)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: #fff;
  position: absolute;
`;

export const WeekDaysView = styled(Animated.View)`
    width: 90%;
    align-self: center;
    border-radius: 10px;
    margin-top: ${width / 33}px;
    position: absolute;
    flex-direction: row;
    justify-content: space-between;
`;

export const WeekButton = styled.TouchableOpacity`
    width: ${width / 11}px;
    height: ${width / 11}px;
    border-radius: 1000px;
    justify-content: center;
    align-items: center;
    background-color: ${theme.COLORS.MAIN};
    border-width: 1px
`;

export const CategoryTitle = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-size: 24px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
    margin-top: 10px;
    align-self: center;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const CategoryFooter = styled.View`
    margin: 10px 0;
    align-items: center;
`;

export const CategoryButton = styled.TouchableOpacity`
    background-color: ${theme.COLORS.MAIN};
    border-radius: 100px;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
`;