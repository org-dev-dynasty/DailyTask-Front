import {Background} from "@/components/background";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from "react";
import {Container, Line, MiddleContainer, TextMiddle, Title} from "@/app/(tabs)/home/styles";
import {Microphone, Keyboard} from "@phosphor-icons/react"

// Ícones
import { Feather } from "@expo/vector-icons";

export default function Home() {
    return(
        <>
            <Background>
                <Container>
                    <Title>Segure para gravar</Title>
                    {/* <Feather name="unlock" size={ 72 } color="white" style={{position: "absolute", top: "15%"}}/> */}
                    {/* <Feather name="trash" size={ 72 } color="white" style={{position: "absolute", top: "15%", start: 0}}/> */}

                    <Microphone
                        size={ 72 }
                        color="white"
                    />
                    <MiddleContainer>
                        <Line />
                        <TextMiddle >ou</TextMiddle>
                        <Line />

                    </MiddleContainer>
                    <Keyboard
                        size={ 72 }
                        color="white"
                    />
                </Container>
            </Background>
        </>
    )
}