import styled from 'styled-components/native'
import React from "react";
import {TextInput} from "react-native-paper";
import { TextInput as NativeTextInput } from 'react-native';

const InputContainer = styled.View`
  flex-direction: row;
`
const Input = styled.TextInput`
  flex: 1;
`
const AdornmentContainer = styled.View`
  align-items: center;
  justify-content: center;
  right: 5px;
`

export const CustomInput = ({right, small, big = false, ...props }) => (
    <>
        {small ? (
            <TextInput
                { ...props }
                render={ (inputProps) => (
                    <InputContainer>
                        <NativeTextInput
                            inputMode={'numeric'}
                            {...inputProps}
                            style={[
                                inputProps.style,
                                {
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                    height: 36,
                                    flex: 1,
                                }
                            ]}
                        />
                        {right && (
                            <AdornmentContainer>
                                {right}
                            </AdornmentContainer>
                        )}
                    </InputContainer>
                ) }

            />
        ) : (big ? (
            <TextInput
                { ...props }
                render={ (inputProps) => (
                    <InputContainer>
                        <NativeTextInput
                            {...inputProps}
                            multiline={true}
                            textAlignVertical={'top'}
                            style={[
                                inputProps.multiline,
                                inputProps.style,
                                {
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                    flex: 1,
                                    height: 100
                                }
                            ]}
                        />
                        {right && (
                            <AdornmentContainer>
                                {right}
                            </AdornmentContainer>
                        )}
                    </InputContainer>
                ) }

            />
            ):(
            <TextInput
                {...props}
                render={(inputProps) => (
                    <InputContainer>
                        <Input {...inputProps} />
                        {right && (
                            <AdornmentContainer>
                                {right}
                            </AdornmentContainer>
                        )}
                    </InputContainer>
                )}
            />
        ))}
    </>
)
