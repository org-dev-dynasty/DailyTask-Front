import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  padding: 15px;
`;


export const LabelView = styled.View`
  flex-direction: row;
  gap: 20px;
  align-items: center;
  padding: 5px;
`;

export const LabelText = styled.Text`
  color: white;
`

export const TaskHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const TaskText = styled.Text`
  color: white;
  font-size: 14px;
`;

export const TaskDescription = styled.View`
  padding: 10px;
`;

export const TaskDescriptionText = styled.Text`
  color: white;
`;