import { Background } from "@/components/background";
import React from "react";
import { TouchableOpacity, View, Animated, Text } from "react-native";
import { Container, TopViewText, Title, InitialScreen, Line, MiddleContainer, TextMiddle, TopViewLock, LockIcon, RecordingTime, RecordingTextInput, RecordingTextInputText } from "@/app/(tabs)/home/styles";
import theme from "@/themes/theme";

// Ícones
import { Microphone, Keyboard, LockSimpleOpen } from "phosphor-react-native";

export default function Home() {
    const [recording, setRecording] = React.useState(false);

    const fadeLock = React.useRef(new Animated.Value(0)).current;
    const fadeTexts = React.useRef(new Animated.Value(1)).current;

    const StartRecordingAnimation = () => {
        Animated.timing(fadeLock, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        Animated.timing(fadeTexts, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    function startRecording() {
        StartRecordingAnimation();
        setTimeout(() => {
            setRecording(true);
        }, 2100);
    }

    return (
        <>
            <Background>
                <Container>
                    {/* <--Modal--> */}
                    {/* <--Modal--> */}
                    {/* <--Initial--> */}
                    <InitialScreen style={{ display: recording ? "none" : "flex" }}>
                        <TopViewLock>
                            <Animated.View style={{ opacity: fadeLock }}>
                                <LockIcon>
                                    <LockSimpleOpen size={64} color={theme.COLORS.WHITE} />
                                </LockIcon>
                            </Animated.View>
                        </TopViewLock>
                        <TopViewText>
                            <Animated.View style={{ opacity: fadeTexts }}>
                                <Title>Segure para gravar</Title>
                            </Animated.View>
                        </TopViewText>
                        <InitialScreen>
                            <TouchableOpacity onPress={() => startRecording()}>
                                <Microphone size={100} color={theme.COLORS.WHITE} />
                            </TouchableOpacity>
                            <Animated.View style={{ opacity: fadeTexts }}>
                                <MiddleContainer>
                                    <Line />
                                    <TextMiddle>ou</TextMiddle>
                                    <Line />
                                </MiddleContainer>
                            </Animated.View>
                            <Animated.View style={{ opacity: fadeTexts }}>
                                <TouchableOpacity>
                                    <Keyboard size={100} color={theme.COLORS.WHITE} />
                                </TouchableOpacity>
                            </Animated.View>
                        </InitialScreen>
                    </InitialScreen>
                    {/* <--Initial--> */}
                    {/* <--Recording--> */}
                    <InitialScreen style={{ display: recording ? "flex" : "none" }}>
                        <TopViewLock>
                            <Animated.View>
                                <LockIcon>
                                    <LockSimpleOpen size={64} color={theme.COLORS.WHITE} />
                                </LockIcon>
                            </Animated.View>
                        </TopViewLock>

                        <InitialScreen>
                            <TouchableOpacity onPress={() => startRecording()}>
                                <Microphone size={100} color={theme.COLORS.WHITE} />
                            </TouchableOpacity>

                            <MiddleContainer>
                                <RecordingTime>0:00</RecordingTime>
                            </MiddleContainer>

                            <RecordingTextInput>
                                <RecordingTextInputText>Lorem</RecordingTextInputText>
                            </RecordingTextInput>

                        </InitialScreen>
                    </InitialScreen>
                    {/* <--Recording--> */}
                </Container>
            </Background>
        </>
    )
}
