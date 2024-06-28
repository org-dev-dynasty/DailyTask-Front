import {Background} from "@/components/background";
import React from "react";
import {Container, Line, MiddleContainer, TextMiddle, Title, TopView, LockIcon} from "@/app/(tabs)/home/styles";
import { TouchableOpacity, View } from "react-native";

// Ícones
import {Microphone, Keyboard, LockSimpleOpen} from "phosphor-react-native"
import theme from "@/themes/theme";

export default function Home() {
    const [recording, setRecording] = React.useState(false);

    function startRecording() {

    }

    return(
        <>
            <Background>
                <Container>
                    <TopView>
                        <Title>Segure para gravar</Title>
                        <LockIcon>
                            <LockSimpleOpen size={ 64 } color="white" />
                        </LockIcon>
                    </TopView>

                    <TouchableOpacity>
                        <Microphone
                            size={ 72 }
                            color="white"
                        />
                    </TouchableOpacity>

                    <MiddleContainer>
                        <Line />
                        <TextMiddle >ou</TextMiddle>
                        <Line />
                    </MiddleContainer>

                    <TouchableOpacity>
                        <Keyboard
                            size={ 72 }
                            color="white"
                        />
                    </TouchableOpacity>
                </Container>
            </Background>
        </>
    )
}