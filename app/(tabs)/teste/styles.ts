import styled from "styled-components/native";
import {Animated} from "react-native";
import theme from "@/themes/theme";

export const TopViewLock = styled(Animated.View)`
    padding: 0;
    top: 0;
    position: absolute;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const LockPill = styled(Animated.View)`
    background-Color: ${theme.COLORS.MAIN};
    border-Radius: 90px;
`;

export const LockIcon = styled.View`
    width: 100px;
    height: 100px;
    background-Color: ${theme.COLORS.MAIN};
    border-Radius: 90px;
    justify-Content: center;
    align-Items: center;
`;