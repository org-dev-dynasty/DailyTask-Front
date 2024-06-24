import {Background} from "@/components/background";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from "react";
import {Container, Line, MiddleContainer, TextMiddle, Title} from "@/app/(tabs)/home/styles";

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

                    <MaterialCommunityIcons
                        name="microphone-outline"
                        size={ 72 }
                        color="white"
                    />
                    <MiddleContainer>
                        <Line />
                        <TextMiddle >ou</TextMiddle>
                        <Line />

                    </MiddleContainer>
                    <MaterialCommunityIcons
                        name="keyboard"
                        size={ 72 }
                        color="white"
                    />
                </Container>
            </Background>
        </>
    )
}