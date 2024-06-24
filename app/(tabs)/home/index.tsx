import {Background} from "@/components/background";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from "react";
import {Container, Line, MiddleContainer, TextMiddle, Title} from "@/app/(tabs)/home/styles";

export default function Home() {
    return(
        <>
            <Background>
                <Container>
                    <Title >Segure para gravar</Title>

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