import { Background } from "@/components/background";
import {useRef, useState} from "react";
import {TouchableOpacity, View, Animated, Text, Easing} from "react-native";
import {
    Container,
    TopViewText,
    Title,
    InitialScreen,
    Line,
    MiddleContainer,
    TextMiddle,
    TopViewLock,
    LockIcon,
    RecordingTime,
    RecordingTextInput,
    RecordingTextInputText,
    CircleAnimation, SecondCircleAnimation, MicrophoneView, CenterElementsDisplay,
    MicrophoneInitialView,
    KeyboardInitialView,
    RecordingTimeView,
    TimerView, CircleView
} from "@/app/(tabs)/home/styles";
import theme from "@/themes/theme";

// Ícones
import { Microphone, Keyboard, LockSimpleOpen } from "phosphor-react-native";

export default function Home() {
    const [recording, setRecording] = useState(false);

    const fadeLock = useRef(new Animated.Value(0)).current;
    const fadeTexts = useRef(new Animated.Value(1)).current;
    const circleSize = useRef(new Animated.Value(100)).current;
    const circleOppacity = useRef(new Animated.Value(0.75)).current;
    const auxCircleSize = useRef(new Animated.Value(100)).current;
    const auxCircleOppacity = useRef(new Animated.Value(0.75)).current;
    const thirdCircleSize = useRef(new Animated.Value(0)).current;
    const thirdCircleOppacity = useRef(new Animated.Value(0)).current;

    const StartRecordingAnimation = () => {
        Animated.timing(fadeLock, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
        Animated.timing(fadeTexts, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    function startRecording() {
        StartRecordingAnimation();
        setTimeout(() => {
            setRecording(true);
            circleAnimation();
        }, 1000);
    }

    function circleAnimation() {
        Animated.timing(circleSize, {
            toValue: 250,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.in(Easing.ease)
        }).start(() => {
            circleAnimationCallback();
        });
        Animated.timing(circleOppacity, {
            toValue: 0.5,
            duration: 1000,
            useNativeDriver: false,
        }).start();
        Animated.timing(auxCircleSize, {
            toValue: 250,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.in(Easing.ease)
        }).start();
        Animated.timing(auxCircleOppacity, {
            toValue: 0.5,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }

    function circleAnimationCallback() {
        auxCircleOppacity.setValue(0.5);
        Animated.timing(auxCircleOppacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.out(Easing.ease)
        }).start();
        Animated.timing(circleOppacity, {
            toValue: 0.25,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.out(Easing.ease)
        }).start();
        Animated.timing(auxCircleSize, {
            toValue: 350,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.out(Easing.ease)
        }).start();
        thirdCircleOppacity.setValue(0.75);
        Animated.timing(thirdCircleSize, {
            toValue: 100,
            duration: 1000,
            useNativeDriver: false,
            easing: Easing.out(Easing.ease)
        }).start(() => {
            Animated.timing(circleSize, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: false,
                easing: Easing.in(Easing.ease)
            }).start();
            Animated.timing(circleOppacity, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: false,
                easing: Easing.in(Easing.ease)
            }).start();
            auxCircleSize.setValue(100);
            auxCircleOppacity.setValue(0.75);
            Animated.timing(auxCircleSize, {
                toValue: 250,
                duration: 1500,
                useNativeDriver: false,
                easing: Easing.in(Easing.ease)
            }).start();
            Animated.timing(auxCircleOppacity, {
                toValue: 0.5,
                duration: 1500,
                useNativeDriver: false,
                easing: Easing.in(Easing.ease)
            }).start();
            Animated.timing(thirdCircleSize, {
                toValue: 250,
                duration: 1500,
                useNativeDriver: false,
                easing: Easing.in(Easing.ease)
            }).start();
            Animated.timing(thirdCircleOppacity, {
                toValue: 0.5,
                duration: 1500,
                useNativeDriver: false,
                easing: Easing.in(Easing.ease)
            }).start(() => {
                Animated.timing(circleSize, {
                    toValue: 100,
                    duration: 1500,
                    useNativeDriver: false,
                    easing: Easing.out(Easing.ease)
                }).start();
                Animated.timing(circleOppacity, {
                    toValue: 0.75,
                    duration: 1500,
                    useNativeDriver: false,
                    easing: Easing.out(Easing.ease)
                }).start();
                Animated.timing(auxCircleSize, {
                    toValue: 350,
                    duration: 1500,
                    useNativeDriver: false,
                    easing: Easing.out(Easing.ease)
                }).start();
                Animated.timing(auxCircleOppacity, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: false,
                    easing: Easing.out(Easing.ease)
                }).start();
                Animated.timing(thirdCircleOppacity, {
                    toValue: 0.25,
                    duration: 1500,
                    useNativeDriver: false,
                    easing: Easing.out(Easing.ease)
                }).start(() => {
                    Animated.timing(circleSize, {
                        toValue: 250,
                        duration: 1500,
                        useNativeDriver: false,
                        easing: Easing.in(Easing.ease)
                    }).start();
                    Animated.timing(circleOppacity, {
                        toValue: 0.5,
                        duration: 1000,
                        useNativeDriver: false,
                    }).start();
                    auxCircleSize.setValue(100);
                    auxCircleOppacity.setValue(0.75);
                    Animated.timing(auxCircleSize, {
                        toValue: 250,
                        duration: 1500,
                        useNativeDriver: false,
                        easing: Easing.in(Easing.ease)
                    }).start();
                    Animated.timing(auxCircleOppacity, {
                        toValue: 0.5,
                        duration: 1500,
                        useNativeDriver: false,
                        easing: Easing.in(Easing.ease)
                    }).start();
                    Animated.timing(thirdCircleSize, {
                        toValue: 0,
                        duration: 1500,
                        useNativeDriver: false,
                        easing: Easing.in(Easing.ease)
                    }).start(() => {
                        circleAnimationCallback();
                    });
                });
            });
        });
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
                        <CenterElementsDisplay>
                            <MicrophoneInitialView onPress={() => startRecording()}>
                                <Microphone size={64} color={theme.COLORS.WHITE} />
                            </MicrophoneInitialView>
                            <Animated.View style={{ opacity: fadeTexts, height: '20%' }}>
                                <MiddleContainer>
                                    <Line />
                                    <TextMiddle>ou</TextMiddle>
                                    <Line />
                                </MiddleContainer>
                            </Animated.View>
                            <KeyboardInitialView style={{ opacity: fadeTexts, height: '40%' }}>
                                <TouchableOpacity>
                                    <Keyboard size={64} color={theme.COLORS.WHITE} />
                                </TouchableOpacity>
                            </KeyboardInitialView>
                        </CenterElementsDisplay>
                    </InitialScreen>
                    {/* <--Initial--> */}
                    {/* <--Recording--> */}
                    <InitialScreen style={{ opacity: fadeLock, display: recording ? "flex" : "none"}}>
                        <TopViewLock>
                            <Animated.View>
                                <LockIcon>
                                    <LockSimpleOpen size={64} color={theme.COLORS.WHITE} />
                                </LockIcon>
                            </Animated.View>
                        </TopViewLock>

                        <CenterElementsDisplay>

                            <MicrophoneView>
                                <CircleView>
                                    <CircleAnimation style={{width: circleSize, height: circleSize, opacity: circleOppacity}}>

                                    </CircleAnimation>
                                    <SecondCircleAnimation style={{width: auxCircleSize, height: auxCircleSize, opacity:auxCircleOppacity}}>

                                    </SecondCircleAnimation>
                                    <CircleAnimation style={{width: thirdCircleSize, height: thirdCircleSize, opacity: thirdCircleOppacity}}/>

                                </CircleView>

                                <TouchableOpacity onPress={() => startRecording()}>
                                    <Microphone size={64} color={theme.COLORS.WHITE} />
                                </TouchableOpacity>
                            </MicrophoneView>


                            <TimerView>
                                <RecordingTime>0:00</RecordingTime>
                            </TimerView>

                            <RecordingTimeView>
                                <RecordingTextInput>
                                    <RecordingTextInputText>Lorem</RecordingTextInputText>
                                </RecordingTextInput>
                            </RecordingTimeView>

                        </CenterElementsDisplay>
                    </InitialScreen>
                    {/* <--Recording--> */}
                </Container>
            </Background>
        </>
    )
}
