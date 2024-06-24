import styled from "styled-components/native";
import theme from "@/themes/theme";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  margin: 0;
  top: 32px;
  padding: 0;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const MiddleContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
`;

export const Line = styled.View`
    width: 35%;
    height: 1px;
    background-color: ${theme.COLORS.WHITE};
`;

export const Title = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.XL};
    padding: 0;
    top: 20%;
    position: absolute;
`;

export const TextMiddle = styled.Text`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.MD};
    margin: 0 10px;
    padding-bottom: 2px;
`;