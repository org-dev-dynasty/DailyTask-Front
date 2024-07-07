import { Background } from "@/components/background";
import {useEffect, useRef, useState} from "react";
import {TouchableOpacity, View, Animated, Text, Easing, Button, Alert, Pressable, PanResponder} from "react-native";
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
    CircleAnimation,
    SecondCircleAnimation,
    MicrophoneView,
    CenterElementsDisplay,
    KeyboardInitialView,
    RecordingTimeView,
    TimerView,
    CircleView,
    LockPill,
    InputModalView, TextModalView, ModalText, ModalView
} from "@/app/(tabs)/home/styles";
import { Dimensions } from 'react-native';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import {LinearGradient} from "expo-linear-gradient";
import {Input} from "@/components/input/input";

// Theme
import theme from "@/themes/theme";

// Icons
import { Microphone, Keyboard, LockSimpleOpen } from "phosphor-react-native";

export default function Home() {
    const [start, setStart] = useState(false);
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [recordingFileUri, setRecordingFileUri] = useState<string | null>(null);

    const fadeLock = useRef(new Animated.Value(0)).current;
    const fadeTexts = useRef(new Animated.Value(1)).current;
    const fadeRecording = useRef(new Animated.Value(0)).current;
    const circleSize = useRef(new Animated.Value(100)).current;
    const circleOpacity = useRef(new Animated.Value(0.75)).current;
    const auxCircleSize = useRef(new Animated.Value(100)).current;
    const auxCircleOpacity = useRef(new Animated.Value(0.75)).current;
    const thirdCircleSize = useRef(new Animated.Value(0)).current;
    const thirdCircleOpacity = useRef(new Animated.Value(0)).current;

    const lockPillSize = useRef(new Animated.Value(100)).current;
    const lockPillY = useRef(new Animated.Value(0)).current;
    const [lockPillYValue, setLockPillYValue] = useState(0);

    const { width, height } = Dimensions.get('window');

    const panY = useRef(new Animated.Value(0)).current;
    const limitY = -(height/2.45 - 100) ; // Defina o ponto até onde o elemento pode subir
    const panMoving = useRef(false);

    const [canReapeat, setCanRepeat] = useState(true);

    function startRecording() {
        if(canReapeat) {
            circleAnimation();
            setTimeout(() => {
                setStart(true);
                handleRecordingStart();
            }, 1000);
        }
    }

    function circleAnimation() {
        Animated.parallel([
            Animated.timing(fadeTexts, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(fadeRecording, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
            }),
            Animated.sequence([
                Animated.timing(fadeLock, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false,
                }),
                Animated.sequence([
                    Animated.timing(lockPillSize, {
                        toValue: height/2.45,
                        duration: 500,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: false,
                    }),
                    Animated.parallel([
                        Animated.timing(circleSize, {
                            toValue: 250,
                            duration: 1000,
                            useNativeDriver: false,
                            easing: Easing.in(Easing.ease)
                        }),
                        Animated.timing(circleOpacity, {
                            toValue: 0.5,
                            duration: 1000,
                            useNativeDriver: false,
                        }),
                        Animated.timing(auxCircleSize, {
                            toValue: 250,
                            duration: 1000,
                            useNativeDriver: false,
                            easing: Easing.in(Easing.ease)
                        }),
                        Animated.timing(auxCircleOpacity, {
                            toValue: 0.5,
                            duration: 1000,
                            useNativeDriver: false,
                        })]),
                    Animated.loop(
                        Animated.sequence([
                            Animated.parallel([
                                Animated.timing(auxCircleOpacity, {
                                    toValue: 0.5,
                                    duration: 0,
                                    useNativeDriver: false,
                                }),
                                Animated.timing(auxCircleOpacity, {
                                    toValue: 0,
                                    duration: 1000,
                                    useNativeDriver: false,
                                    easing: Easing.out(Easing.ease)
                                }),
                                Animated.timing(circleSize, {
                                    toValue: 250,
                                    duration: 0,
                                    useNativeDriver: false,
                                }),
                                Animated.timing(circleOpacity, {
                                    toValue: 0.25,
                                    duration: 1000,
                                    useNativeDriver: false,
                                    easing: Easing.out(Easing.ease)
                                }),
                                Animated.timing(auxCircleSize, {
                                    toValue: 250,
                                    duration: 0,
                                    useNativeDriver: false,
                                }),
                                Animated.timing(auxCircleSize, {
                                    toValue: 350,
                                    duration: 1000,
                                    useNativeDriver: false,
                                    easing: Easing.out(Easing.ease)
                                }),
                                Animated.timing(thirdCircleOpacity, {
                                    toValue: 0.75,
                                    duration: 0,
                                    useNativeDriver: false,
                                }),
                                Animated.timing(thirdCircleSize, {
                                    toValue: 100,
                                    duration: 1000,
                                    useNativeDriver: false,
                                    easing: Easing.out(Easing.ease)
                                })]),
                            Animated.parallel([
                                Animated.timing(circleSize, {
                                    toValue: 0,
                                    duration: 1500,
                                    useNativeDriver: false,
                                    easing: Easing.in(Easing.ease)
                                }),
                                Animated.timing(circleOpacity, {
                                    toValue: 0,
                                    duration: 1500,
                                    useNativeDriver: false,
                                    easing: Easing.in(Easing.ease)
                                }),
                                Animated.timing(auxCircleSize, {
                                    toValue: 100,
                                    duration: 0,
                                    useNativeDriver: false,
                                }),
                                Animated.timing(auxCircleOpacity, {
                                    toValue: 0.75,
                                    duration: 0,
                                    useNativeDriver: false,
                                }),
                                Animated.timing(auxCircleSize, {
                                    toValue: 250,
                                    duration: 1500,
                                    useNativeDriver: false,
                                    easing: Easing.in(Easing.ease)
                                }),
                                Animated.timing(auxCircleOpacity, {
                                    toValue: 0.5,
                                    duration: 1500,
                                    useNativeDriver: false,
                                    easing: Easing.in(Easing.ease)
                                }),
                                Animated.timing(thirdCircleSize, {
                                    toValue: 250,
                                    duration: 1500,
                                    useNativeDriver: false,
                                    easing: Easing.in(Easing.ease)
                                }),
                                Animated.timing(thirdCircleOpacity, {
                                    toValue: 0.5,
                                    duration: 1500,
                                    useNativeDriver: false,
                                    easing: Easing.in(Easing.ease)
                                })]),
                            Animated.parallel([
                                Animated.timing(circleSize, {
                                    toValue: 100,
                                    duration: 1500,
                                    useNativeDriver: false,
                                    easing: Easing.out(Easing.ease)
                                }),
                                Animated.timing(circleOpacity, {
                                    toValue: 0.75,
                                    duration: 1500,
                                    useNativeDriver: false,
                                    easing: Easing.out(Easing.ease)
                                }),
                                Animated.timing(auxCircleSize, {
                                    toValue: 350,
                                    duration: 1500,
                                    useNativeDriver: false,
                                    easing: Easing.out(Easing.ease)
                                }),
                                Animated.timing(auxCircleOpacity, {
                                    toValue: 0,
                                    duration: 1500,
                                    useNativeDriver: false,
                                    easing: Easing.out(Easing.ease)
                                }),
                                Animated.timing(thirdCircleOpacity, {
                                    toValue: 0.25,
                                    duration: 1500,
                                    useNativeDriver: false,
                                    easing: Easing.out(Easing.ease)
                                })]),
                            Animated.parallel([
                                Animated.timing(circleSize, {
                                    toValue: 250,
                                    duration: 1500,
                                    useNativeDriver: false,
                                    easing: Easing.in(Easing.ease)
                                }),
                                Animated.timing(circleOpacity, {
                                    toValue: 0.5,
                                    duration: 1000,
                                    useNativeDriver: false,
                                }),
                                Animated.timing(auxCircleSize, {
                                    toValue: 100,
                                    duration: 0,
                                    useNativeDriver: false,
                                }),
                                Animated.timing(auxCircleOpacity, {
                                    toValue: 0.75,
                                    duration: 0,
                                    useNativeDriver: false,
                                }),
                                Animated.timing(auxCircleSize, {
                                    toValue: 250,
                                    duration: 1500,
                                    useNativeDriver: false,
                                    easing: Easing.in(Easing.ease)
                                }),
                                Animated.timing(auxCircleOpacity, {
                                    toValue: 0.5,
                                    duration: 1500,
                                    useNativeDriver: false,
                                    easing: Easing.in(Easing.ease)
                                }),
                                Animated.timing(thirdCircleSize, {
                                    toValue: 0,
                                    duration: 1500,
                                    useNativeDriver: false,
                                    easing: Easing.in(Easing.ease)
                                })])]))])])
        ]).start();
    }

    useEffect(() => {
        const listenerId = lockPillY.addListener(({ value }) => {
            setLockPillYValue(value);
        });

        return () => {
            lockPillY.removeListener(listenerId);
        };
    }, []);


    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => {
                console.log(panMoving)
                // Verifica se o gesto é um press (toque longo) ou um arrasto
                const isLongPress = gestureState.numberActiveTouches === 1 && gestureState.dx === 0 && gestureState.dy === 0;
                return !isLongPress;
            },
            onMoveShouldSetPanResponder: (event, gestureState) => {
                return Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2; // Inicia o PanResponder se houver um movimento suficiente
            },
            onPanResponderMove: (event, gestureState) => {
                panMoving.current = true;
                if (gestureState.dy < limitY) {
                    panY.setValue(limitY);
                    lockPillSize.setValue(100);
                } else if (gestureState.dy > 0) {
                    panY.setValue(0);
                    lockPillSize.setValue(height/2.45);
                } else {
                    panY.setValue(gestureState.dy);
                    lockPillSize.setValue(height/2.45 + gestureState.dy);
                }
            },
            onPanResponderRelease: (event, gestureState) => {
                if (gestureState.dy > limitY) {
                    Animated.spring(
                        panY,
                        { toValue: 0, useNativeDriver: false }
                    ).start();
                    Animated.spring(
                        lockPillSize,
                        { toValue: height/2.45, useNativeDriver: false }
                    ).start(
                    )
                } else {
                    panY.setValue(limitY);
                }
                panMoving.current = false;
                // handlePressOut();
            }
        })
    ).current;


    function stopCircleAnimation() {
        setCanRepeat(false);

        // Colocar if para checar o tempo da animação, para adaptar a animação de acordo com o tempo

        circleSize.stopAnimation();
        circleOpacity.stopAnimation();
        auxCircleSize.stopAnimation();
        auxCircleOpacity.stopAnimation();
        thirdCircleSize.stopAnimation();
        thirdCircleOpacity.stopAnimation();
        lockPillSize.stopAnimation();
        fadeLock.stopAnimation();
        fadeTexts.stopAnimation();
        Animated.timing(circleSize, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.in(Easing.ease)
        }).start();
        Animated.timing(circleOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.in(Easing.ease)
        }).start();
        Animated.timing(auxCircleSize, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.in(Easing.ease)
        }).start();
        Animated.timing(auxCircleOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.in(Easing.ease)
        }).start();
        Animated.timing(thirdCircleSize, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.in(Easing.ease)
        }).start();
        Animated.timing(thirdCircleOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.in(Easing.ease)
        }).start(() => {
            Animated.timing(fadeRecording, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
            }).start();
            Animated.timing(lockPillSize, {
                toValue: 100,
                duration: 1000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
            }).start(() => {
                Animated.timing(fadeLock, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: false,
                }).start(() => {
                    setStart(false);
                    Animated.timing(fadeTexts, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }).start();
                });
            });
        });
        setTimeout(() => {
            setCanRepeat(true);
        }, 2000);
    }

    // Audio Recording
    async function handleRecordingStart(){
        const {granted} = await Audio.getPermissionsAsync();
        if(granted){
            try {
                const { recording } = await Audio.Recording.createAsync();
                setRecording( recording );
            } catch (error) {
                console.log(error);
                // Alert.alert('Erro ao gravar', 'Ocorreu um erro ao tentar gravar o áudio');
            }
        }
    }

    async function handleRecordingStop(){
        stopCircleAnimation()
        try {
            if(recording){
                await recording.stopAndUnloadAsync();
                const fileUri = recording.getURI();
                console.log(fileUri);
                setRecordingFileUri(fileUri);
                setRecording(null);
                // setStart(false);
            }
        }
        catch (error) {
            console.log(error);
            // Alert.alert('Erro ao pausar', 'Ocorreu um erro ao tentar parar a gravação do áudio');
        }
    }

    async function handlePlayAudio(){
        if(recordingFileUri){
            const {sound} = await Audio.Sound.createAsync({uri: recordingFileUri}, {shouldPlay: true});

            await sound.setPositionAsync(0);
            await sound.playAsync();

        }
    }

    useEffect(() => {
        Audio
        .requestPermissionsAsync()
        .then(({ granted }) => {
            if (granted) {
                Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    interruptionModeIOS: InterruptionModeIOS.DoNotMix,
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: true,
                    interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
                    playThroughEarpieceAndroid: true,
                })
            }
        })
    }, [])

    return (
        <>
            <Background>
                <Container>

                    {/* <--Modal--> */}
                    {/*<ModalView>*/}
                    {/*    <LinearGradient*/}
                    {/*        colors={['#3C0B50', '#2E083D', '#0F0413']}*/}
                    {/*        locations={[0, 0.28, 1]}*/}
                    {/*        style={{*/}
                    {/*            height: '100%',*/}
                    {/*            width: "100%",*/}
                    {/*            borderRadius: 15,*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        <InputModalView>*/}
                    {/*            <Input label='Nome da Task*'/>*/}
                    {/*        </InputModalView>*/}

                    {/*        <TextModalView>*/}
                    {/*            <ModalText>Data e Horário*</ModalText>*/}
                    {/*        </TextModalView>*/}

                    {/*        <InputModalView>*/}
                    {/*            <Input label='Local'/>*/}
                    {/*        </InputModalView>*/}
                    {/*    </LinearGradient>*/}
                    {/*</ModalView>*/}
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
                            <MicrophoneView {...panResponder.panHandlers}
                                            style={{ transform: [{ translateY: panY }] }}>
                                <CircleView>
                                    <CircleAnimation style={{width: circleSize, height: circleSize, opacity: circleOpacity,
                                        backgroundColor: start ? theme.COLORS.MAIN : ''}}/>
                                    <SecondCircleAnimation style={{width: auxCircleSize, height: auxCircleSize, opacity:auxCircleOpacity,
                                        backgroundColor: start ? theme.COLORS.MAIN : ''}}/>
                                    <CircleAnimation style={{width: thirdCircleSize, height: thirdCircleSize, opacity: thirdCircleOpacity,
                                        backgroundColor: start ? theme.COLORS.MAIN : ''}}/>
                                </CircleView>

                                <Pressable
                                    {...panResponder.panHandlers}
                                    onPressIn={startRecording}
                                    onPressOut={handleRecordingStop}>
                                    <Microphone size={64} color={theme.COLORS.WHITE} />
                                </Pressable>
                            </MicrophoneView>
                            {/* Center Itens */}
                            {/* Initial Center */}
                            <Animated.View style={{ opacity: fadeTexts, height: '20%', display: start ? 'none' : 'flex' }}>
                                <MiddleContainer>
                                    <Line />
                                    <TextMiddle>ou</TextMiddle>
                                    <Line />
                                </MiddleContainer>
                            </Animated.View>
                            {/* Timer */}
                            <TimerView style={{display: start ? 'flex' : 'none', opacity: fadeRecording}}>
                                <RecordingTime>0:00</RecordingTime>
                            </TimerView>
                            {/* Keyboard */}
                            <KeyboardInitialView style={{ opacity: fadeTexts, display: start ? 'none' : 'flex'}}>
                                <TouchableOpacity>
                                    <Keyboard size={64} color={theme.COLORS.WHITE} />
                                </TouchableOpacity>
                            </KeyboardInitialView>
                            {/* Audio Trancription */}
                            <RecordingTimeView style={{display: start ? 'flex' : 'none', opacity: fadeRecording}}>
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
