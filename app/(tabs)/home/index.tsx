import { Background } from "@/components/background";
import {useRef, useState} from "react";
import {TouchableOpacity, View, Animated, Text, Easing, Button} from "react-native";
import {
    Container, TopViewText, Title, InitialScreen, Line, MiddleContainer, TextMiddle, TopViewLock, LockIcon, RecordingTime, RecordingTextInput, 
    RecordingTextInputText, CircleAnimation, SecondCircleAnimation, MicrophoneView, CenterElementsDisplay,
    KeyboardInitialView, RecordingTimeView, TimerView, CircleView,
    LockPill
} from "@/app/(tabs)/home/styles";
import { Dimensions } from 'react-native';

// Theme
import theme from "@/themes/theme";

// Icons
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

    const lockPillSize = useRef(new Animated.Value(100)).current;

    const { width, height } = Dimensions.get('window');

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
        Animated.timing(lockPillSize, {
            toValue: height/2.4,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();

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
                    {/* <--Screen--> */}

                    <InitialScreen style={{ display: "flex" }}>
                        {/* Lock View */}
                        <TopViewLock style={{ opacity: fadeLock }}>
                            <LockPill style={{height: lockPillSize}}>
                                <LockIcon>
                                    <LockSimpleOpen size={64} color={theme.COLORS.WHITE} />
                                </LockIcon>
                            </LockPill>
                        </TopViewLock>
                        {/* Title View */}
                        <TopViewText>
                            <Animated.View style={{ opacity: fadeTexts }}>
                                <Title>Segure para gravar</Title>
                            </Animated.View>
                        </TopViewText>
                        {/* Center Elements */}
                        <CenterElementsDisplay>
                            {/* Microphone */}
                            <MicrophoneView>
                                <CircleView>
                                    <CircleAnimation style={{width: circleSize, height: circleSize, opacity: circleOppacity, 
                                        backgroundColor: recording ? theme.COLORS.MAIN : ''}}/>
                                    <SecondCircleAnimation style={{width: auxCircleSize, height: auxCircleSize, opacity:auxCircleOppacity, 
                                        backgroundColor: recording ? theme.COLORS.MAIN : ''}}/>
                                    <CircleAnimation style={{width: thirdCircleSize, height: thirdCircleSize, opacity: thirdCircleOppacity, 
                                        backgroundColor: recording ? theme.COLORS.MAIN : ''}}/>
                                </CircleView>

                                <TouchableOpacity onPress={() => startRecording()}>
                                    <Microphone size={64} color={theme.COLORS.WHITE} />
                                </TouchableOpacity>
                            </MicrophoneView>
                            {/* Center Itens */}
                            {/* Initial Center */}
                            <Animated.View style={{ opacity: fadeTexts, height: '20%', display: recording ? 'none' : 'flex' }}>
                                <MiddleContainer>
                                    <Line />
                                    <TextMiddle>ou</TextMiddle>
                                    <Line />
                                </MiddleContainer>
                            </Animated.View>
                            {/* Timer */}
                            <TimerView style={{display: recording ? 'flex' : 'none'}}>
                                <RecordingTime>0:00</RecordingTime>
                            </TimerView>
                            {/* Keyboard */}
                            <KeyboardInitialView style={{ opacity: fadeTexts, display: recording ? 'none' : 'flex'}}>
                                <TouchableOpacity>
                                    <Keyboard size={64} color={theme.COLORS.WHITE} />
                                </TouchableOpacity>
                            </KeyboardInitialView>
                            {/* Audio Trancription */}
                            <RecordingTimeView style={{display: recording ? 'flex' : 'none'}}>
                                <RecordingTextInput>
                                    <RecordingTextInputText>Lorem</RecordingTextInputText>
                                </RecordingTextInput>
                            </RecordingTimeView>
                        </CenterElementsDisplay>
                        {/* -------------- */}
                    </InitialScreen>
                    {/* <--Screen--> */}
                </Container>
            </Background>
        </>
    )
}
