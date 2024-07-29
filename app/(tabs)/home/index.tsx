import { Background } from "@/components/background";
import React, {useEffect, useRef, useState} from "react";
import {
    TouchableOpacity,
    Text,
    Animated,
    Easing,
    Pressable,
    PanResponder,
    PanResponderGestureState, Alert
} from "react-native";
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
    SendButton,
    SendButtonText,
    InputCancelButton,
    InputButtonsView,
    InputConfirmButton,
    InputEditButton,
    TrashView,
} from "@/app/(tabs)/home/styles";
import { Dimensions } from 'react-native';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import * as FileSystem from 'expo-file-system';

// Theme
import theme from "@/themes/theme";

// Icons
import {Microphone, Keyboard, LockSimpleOpen, TrashSimple, CaretLeft} from "phosphor-react-native";
import TaskModal from "@/components/taskModal";
import Timer from "@/components/timer";

export default function Home() {
    const [start, setStart] = useState(false);
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [recordingFileUri, setRecordingFileUri] = useState<string | null>(null);
    const [isEditable, setIsEditable] = useState(false);
    const [openTask, setOpenTask] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [firstRecorder, setFirstRecorder] = useState(true);

    const [startTimer, setStartTimer] = useState(false);

    const fadeLock = useRef(new Animated.Value(0)).current;
    const fadeTexts = useRef(new Animated.Value(1)).current;
    const fadeInput = useRef(new Animated.Value(0)).current;
    const fadeTimer = useRef(new Animated.Value(0)).current;
    const circleSize = useRef(new Animated.Value(100)).current;
    const circleOpacity = useRef(new Animated.Value(0.75)).current;
    const auxCircleSize = useRef(new Animated.Value(100)).current;
    const auxCircleOpacity = useRef(new Animated.Value(0.75)).current;
    const thirdCircleSize = useRef(new Animated.Value(0)).current;
    const thirdCircleOpacity = useRef(new Animated.Value(0)).current;
    const canRepeat = useRef(true);

    const lockPillSize = useRef(new Animated.Value(100)).current;

    const { width, height } = Dimensions.get('window');

    const panY = useRef(new Animated.Value(0)).current;
    const circleX = useRef(new Animated.Value(0)).current;
    const lockX = useRef(new Animated.Value(0)).current;
    const lockPillLimitY = -(height/2.45 - 100);
    const panMoving = useRef(false);
    const recordingStarted = useRef(false);
    const microphoneMove = useRef(true);
    const microphoneFixed = useRef(false);
    const microphoneOpacity = useRef(new Animated.Value(1)).current;
    const sendButtonX = useRef(new Animated.Value(-width * 0.7)).current;
    const sendButtonY = useRef(new Animated.Value(0)).current;
    const inputButtonsY = useRef(new Animated.Value(-100)).current;
    const inputButtonsOpacity = useRef(new Animated.Value(0)).current;

    const inputY = useRef(new Animated.Value(0)).current;
    const inputBorderBottomLeftRadius = useRef(new Animated.Value(15)).current;
    const inputBorderBottomRightRadius = useRef(new Animated.Value(15)).current;

    const iconsOpacity = useRef(new Animated.Value(0)).current;
    const iconsSeparator = useRef(new Animated.Value(width/2)).current;
    const moveIconsX = useRef(new Animated.Value(0)).current;
    const trashPanX = useRef(new Animated.Value(0)).current;
    const limitIconsX = -(width/4) ;
    const gestureReleased = useRef(false);

    const sizeAnimatedValue = useRef(new Animated.Value(0)).current;

    function startRecording() {
        if(!firstRecorder) {
            console.log('Segunda vez')
            handleRecordingStop();
            deleteRecording();
        }else{
            console.log('Primeira vez')
            setFirstRecorder(false);
        };
        setStartTimer(false); // Stop the timer first
        setTimeout(() => {
          setStartTimer(true); // Restart the timer
        }, 0); // Ensure state update is processed
        console.log('chegou no start recording')
        if(canRepeat.current && !microphoneFixed.current) {
            recordingStarted.current = true;
            holdingAnimation();
            gestureReleased.current = false;
            setStart(true);
            setTimeout(() => {
                handleRecordingStart();
            }, 1000);
        }
    }

    function holdingAnimation() {
        Animated.timing(fadeTexts, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start()
        Animated.timing(fadeInput, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
        }).start()
        Animated.timing(fadeTimer, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
        }).start()
        Animated.timing(fadeLock, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start(() => {
            if(!panMoving.current && !microphoneFixed.current) {
                Animated.timing(lockPillSize, {
                    toValue: height / 2.45,
                    duration: 500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: false,
                }).start()
            }
            Animated.timing(iconsOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                if(canRepeat.current){
                    Animated.timing(iconsSeparator, {
                        toValue: width / 8,
                        duration: 500,
                        useNativeDriver: false,
                    }).start()
                        Animated.timing(circleSize, {
                            toValue: 250,
                            duration: 1000,
                            useNativeDriver: false,
                            easing: Easing.in(Easing.ease)
                        }).start( )
                    Animated.sequence([
                        Animated.parallel([
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
                                    })])]))
                    ]).start();
                }
            })
        })
    }

    const circlePanResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (event, gestureState) => {
                if(!recordingStarted.current) return false;
                const isLongPress = gestureState.numberActiveTouches === 1 && gestureState.dx === 0 && gestureState.dy === 0;
                return !isLongPress;
            },
            onMoveShouldSetPanResponder: (event, gestureState) => {
                return Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2;
            },
            onPanResponderMove: async (event, gestureState) => {
                if(gestureReleased.current) return
                panMoving.current = true;

                if (gestureState.dx < 0 && gestureState.dy >= 0) {
                    trashPanX.setValue(gestureState.dx);
                    sizeAnimatedValue.setValue(-gestureState.dx);
                    if(gestureState.dx < limitIconsX){
                        if(!microphoneFixed.current){
                            gestureReleased.current = true
                            handleRelease(gestureState);
                        }else{
                            gestureReleased.current = true
                            deleteAudioAnimation()
                            await handleRecordingStop();
                            setIsLocked(false);
                            console.log('deletou')
                        }

                    }
                } else {
                    Animated.spring(trashPanX, {toValue: 0, useNativeDriver: false}).start();
                    Animated.spring(sizeAnimatedValue, {toValue: 0, useNativeDriver: false}).start();
                }

                if(!recordingStarted.current) {
                    return
                }
                if(!canRepeat.current){
                    panY.setValue(0);
                    inputY.setValue(0);
                    lockPillSize.setValue(height/2.45);
                    microphoneOpacity.setValue(1);
                    iconsSeparator.setValue(width/8);
                }
                if (gestureState.dy < lockPillLimitY) {
                    panY.setValue(lockPillLimitY);
                    inputY.setValue(lockPillLimitY);
                    lockPillSize.setValue(100);
                    microphoneOpacity.setValue(0);
                    iconsSeparator.setValue(width/2);
                } else if (gestureState.dy > 0) {
                    panY.setValue(0);
                    inputY.setValue(0);
                    lockPillSize.setValue(height/2.45);
                    microphoneOpacity.setValue(1);
                } else if (gestureState.dx >= 0 || (gestureState.dy < 0 && gestureState.dx < 0)) {
                    panY.setValue(gestureState.dy);
                    inputY.setValue(gestureState.dy);
                    lockPillSize.setValue(height/2.45 + gestureState.dy);
                    microphoneOpacity.setValue(1 + gestureState.dy * (5/height));
                    iconsOpacity.setValue(1 + gestureState.dy * (5/height));
                    iconsSeparator.setValue(width/8 + (-gestureState.dy));

                }
            },
            onPanResponderRelease: (event, gestureState) => {
                handleRelease(gestureState);
            }
        })
    ).current;

    const handleRelease = (gestureState : PanResponderGestureState) => {
        if(recordingStarted.current) {
            microphoneMove.current = true;
            recordingStarted.current = false;
            if (gestureState.dy > lockPillLimitY && !microphoneFixed.current) {
                Animated.spring(panY, {toValue: 0, useNativeDriver: false}).start();
                Animated.spring(inputY, {toValue: 0, useNativeDriver: false}).start();
                handlePressOut();
                microphoneFixed.current = false;
            } else {
                setIsLocked(true);
                console.log('TRAVOU A GRAVAÇÃO');
                microphoneMove.current = false;
                microphoneFixed.current = true;
                lockedAnimation();
            }
            Animated.spring(trashPanX, {toValue: 0, useNativeDriver: false}).start();
            Animated.spring(sizeAnimatedValue, {toValue: 0, useNativeDriver: false}).start();

            panMoving.current = false;
        }
    };

    function confirmRecording() {
        Animated.timing(inputBorderBottomLeftRadius, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start()
        Animated.timing(inputBorderBottomRightRadius, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start()
        Animated.timing(lockX, {
            toValue: width * 0.7,
            duration: 500,
            useNativeDriver: false,
        }).start()
        Animated.timing(inputY, {
            toValue: -height/2.7,
            duration: 500,
            useNativeDriver: false,
        }).start()
        Animated.timing(sendButtonY, {
            toValue: -120,
            duration: 500,
            useNativeDriver: false,
        }).start()
        inputButtonsOpacity.setValue(1);
        Animated.timing(inputButtonsY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start()
        Animated.timing(moveIconsX, {
            toValue: -width/2,
            duration: 500,
            useNativeDriver: false,
        }).start()
        Animated.timing(circleX, {
            toValue: width * 0.75,
            duration: 500,
            useNativeDriver: false,
        }).start(async () => {
            handleRecordingStop();
            if (isLocked) {
                setIsLocked(false);
            }
            circleSize.stopAnimation();
            circleOpacity.stopAnimation();
            auxCircleSize.stopAnimation();
            auxCircleOpacity.stopAnimation();
            thirdCircleSize.stopAnimation();
            thirdCircleOpacity.stopAnimation();
            fadeTimer.setValue(0);
            stopCircleAnimation()
            iconsOpacity.setValue(0);
            fadeLock.setValue(0);
        })
    }

    function stopHoldingAnimation() {
        canRepeat.current = false;
        microphoneFixed.current = false;
        // Colocar if para checar o tempo da animação, para adaptar a animação conforme o tempo

        circleSize.stopAnimation();
        circleOpacity.stopAnimation();
        auxCircleSize.stopAnimation();
        auxCircleOpacity.stopAnimation();
        thirdCircleSize.stopAnimation();
        thirdCircleOpacity.stopAnimation();
        fadeLock.stopAnimation();
        fadeTexts.stopAnimation();

        Animated.timing(iconsOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
        stopCircleAnimation();
        Animated.timing(microphoneOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start(() => {
            Animated.timing(fadeInput, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false,
            }).start();
            Animated.timing(fadeTimer, {
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
            canRepeat.current = true;
            microphoneFixed.current = false;
        }, 2000);
    }

    function stopCircleAnimation(){
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
        }).start()
    }

    function deleteAudioAnimation() {
        Animated.timing(lockX, {
            toValue: -width * 0.7,
            duration: 500,
            useNativeDriver: false,
        }).start()
        Animated.timing(fadeInput, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start()
        Animated.timing(fadeTimer, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start()
        Animated.timing(moveIconsX, {
            toValue: -width * 0.75,
            duration: 500,
            useNativeDriver: false,
        }).start()
        Animated.timing(circleX, {
            toValue: -width * 0.75,
            duration: 500,
            useNativeDriver: false,
        }).start(() => {
            circleSize.stopAnimation();
            circleOpacity.stopAnimation();
            auxCircleSize.stopAnimation();
            auxCircleOpacity.stopAnimation();
            thirdCircleSize.stopAnimation();
            thirdCircleOpacity.stopAnimation();
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
                setStart(false);
                panY.setValue(0);
                circleX.setValue(0);
                fadeLock.setValue(0);
                lockX.setValue(0);
                sendButtonX.setValue(-width * 0.7);
                inputY.setValue(0);
                moveIconsX.setValue(0);
                iconsOpacity.setValue(0)
                trashPanX.setValue(0)
                sizeAnimatedValue.setValue(0);
                panMoving.current = false;
                Animated.timing(fadeTexts, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start()
                Animated.timing(microphoneOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false,
                }).start(() => {
                    canRepeat.current = true;
                    microphoneFixed.current = false;
                });
            })
        })
    }

    function cancelAnimation() {
        Animated.timing(inputY, {
            toValue: -height * 0.9,
            duration: 1000,
            useNativeDriver: false,
        }).start(() => {
            setStart(false);
            inputY.setValue(0);
            fadeInput.setValue(0);
            panY.setValue(0);
            inputButtonsY.setValue(-100);
            inputButtonsOpacity.setValue(0);
            inputBorderBottomLeftRadius.setValue(15);
            inputBorderBottomRightRadius.setValue(15);
            Animated.timing(fadeTexts, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
            Animated.timing(microphoneOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                sendButtonX.setValue(-width * 0.7);
                canRepeat.current = true;
                microphoneFixed.current = false;
                lockX.setValue(0);
                sendButtonY.setValue(0);
                moveIconsX.setValue(0);
                circleX.setValue(0);
            });
        })
    }

    function lockedAnimation(){
        Animated.timing(sendButtonX, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
        iconsOpacity.setValue(1);
        Animated.timing(iconsSeparator, {
            toValue: width / 8,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }

    // Audio Recording
    async function handleRecordingStart(){
        const {granted} = await Audio.getPermissionsAsync();
        if(granted){
            try {
                const { recording } = await Audio.Recording.createAsync();
                console.log('TÁ GRAVANDO');
                setRecording( recording );
            } catch (error) {
                console.log(error);
                Alert.alert('Erro ao gravar', 'Ocorreu um erro ao tentar gravar o áudio. Por favor tente Novamente');
            }
        }
    }

    const handlePressOut = () => {
        setTimeout(() => {
            if(!panMoving.current) {
                if(microphoneMove.current){
                    stopHoldingAnimation()
                }
                handleRecordingStop()
            }
        },100)
    };

    async function handleRecordingStop(){
        try {
            if(recording){
                console.log('PAROU DE GRAVAR');
                await recording.stopAndUnloadAsync();
                const fileUri = recording.getURI();
                console.log(fileUri);
                setRecordingFileUri(fileUri);
                setRecording(null);
                // setStart(false);
            }
            else {
                console.log('Não está gravando');
            }
        }
        catch (error) {
            console.log(error);
            Alert.alert('Erro ao pausar', 'Ocorreu um erro ao tentar parar a gravação do áudio');
        }
    }

    const deleteRecording = async () => {
        if (recordingFileUri) {
          try {
            // const fileInfo = await FileSystem.getInfoAsync(recordingFileUri);
            // console.log('File exists before deletion:', fileInfo.exists);
            await FileSystem.deleteAsync(recordingFileUri);
            // const fileInfo2 = await FileSystem.getInfoAsync(recordingFileUri);
            // console.log('File exists before deletion:', fileInfo2.exists);
            setRecordingFileUri(null);
            console.log('Recording deleted');
          } catch (err) {
            console.error('Failed to delete recording', err);
          }
        }
    }

    async function handlePlayAudio(){
        console.log('Tocando áudio');
        if(recordingFileUri){
            const {sound} = await Audio.Sound.createAsync({uri: recordingFileUri}, {shouldPlay: true});

            await sound.setPositionAsync(0);
            await sound.playAsync();
        }
    }

    const handleCloseTask = () => {
        setOpenTask(false);
    };

    // Request to create task
    function transcribeAudio() {
        console.log('Task created');
        try{
            console.log(recording);
            if(recordingFileUri){
                const formData = new FormData();
                formData.append('audio_file', recordingFileUri);
                console.log(formData);
                console.log(formData.get('audio_file')?.valueOf());
            }
        } catch (error) {
            console.log(error);
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
                    {openTask && (
                        <TaskModal onClose={handleCloseTask} confirm/>
                    )}

                    {/* <--Screen--> */}
                    <InitialScreen style={{ display: "flex" }}>
                        {/* Lock View */}
                        <TopViewLock style={{ opacity: fadeLock, transform: [{translateX: lockX}]}}>
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
                            <MicrophoneView {...circlePanResponder.panHandlers}
                                            style={{ transform: [{ translateY: panY }]}}>
                                <CircleView style={{transform: [{translateX: circleX}]}}>
                                    <CircleAnimation style={{width: circleSize, height: circleSize, opacity: circleOpacity,
                                        backgroundColor: start ? theme.COLORS.MAIN : ''}}/>
                                    <SecondCircleAnimation style={{width: auxCircleSize, height: auxCircleSize, opacity:auxCircleOpacity,
                                        backgroundColor: start ? theme.COLORS.MAIN : ''}}/>
                                    <CircleAnimation style={{width: thirdCircleSize, height: thirdCircleSize, opacity: thirdCircleOpacity,
                                        backgroundColor: start ? theme.COLORS.MAIN : ''}}/>
                                </CircleView>


                                <Animated.View
                                    style={{opacity: microphoneOpacity, zIndex: 2}}>
                                    <Pressable
                                        onPressIn={isLocked ? null : startRecording}
                                        onPressOut={isLocked ? null : handlePressOut}>
                                        <Microphone size={64} color={theme.COLORS.WHITE} />
                                    </Pressable>
                                </Animated.View>

                                <TrashView
                                    style={{opacity: iconsOpacity, transform: [{translateX: moveIconsX}]}}>
                                    <Animated.View
                                        style={{width: 200, height: 100, alignItems: 'center', flexDirection: "row"}}
                                    >
                                        <Animated.View style={{ transform: [{ scale: sizeAnimatedValue.interpolate({ inputRange: [0, 100], outputRange: [1, 2] }) }], marginRight: width/8, marginLeft: width/40 }}>
                                            <TrashSimple size={48} color={theme.COLORS.RED_300} />
                                        </Animated.View>
                                        {/*<Animated.View style={{width: iconsSeparator}} />*/}
                                        <Animated.View
                                            style={{ transform: [{ translateX: trashPanX }]}}
                                        >
                                            <CaretLeft size={32} color={theme.COLORS.WHITE}/>
                                        </Animated.View>
                                    </Animated.View>
                                </TrashView>

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
                            <TimerView style={{display: start ? 'flex' : 'none', opacity: fadeTimer, transform: [{ translateY: panY }]}}>
                                {/* <RecordingTime>0:00</RecordingTime> */}
                                <Timer startTimer={startTimer} />
                            </TimerView>
                            {/* Keyboard */}
                            <KeyboardInitialView style={{ opacity: fadeTexts, display: start ? 'none' : 'flex'}}>
                                {/* <TouchableOpacity onPress={() => setOpenTask(true)}> */}
                                <TouchableOpacity onPress={() => handlePlayAudio()}>
                                    <Keyboard size={64} color={theme.COLORS.WHITE} />
                                </TouchableOpacity>
                            </KeyboardInitialView>
                            {/* Audio Trancription */}
                            <RecordingTimeView style={{display: start ? 'flex' : 'none', opacity: fadeInput, transform: [{ translateY: inputY}]}}>
                                <RecordingTextInput style={{borderBottomLeftRadius: inputBorderBottomLeftRadius, borderBottomRightRadius: inputBorderBottomRightRadius}}>
                                    <RecordingTextInputText editable={isEditable}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</RecordingTextInputText>
                                </RecordingTextInput>
                                <InputButtonsView style={{transform: [{ translateY: inputButtonsY}], opacity: inputButtonsOpacity}}>
                                    <InputCancelButton onPress={cancelAnimation}>
                                        <SendButtonText>
                                            Cancelar
                                        </SendButtonText>
                                    </InputCancelButton>
                                    <InputEditButton onPress={() => setIsEditable(true)}>
                                        <SendButtonText>
                                            Editar
                                        </SendButtonText>
                                    </InputEditButton>
                                    <InputConfirmButton onPress={() => setOpenTask(true)}>
                                        <SendButtonText>
                                            Confirmar
                                        </SendButtonText>
                                    </InputConfirmButton>
                                </InputButtonsView>

                                <Animated.View style = {{alignItems: "center" ,width: "100%",  transform: [{ translateX: sendButtonX}, {translateY: sendButtonY}]}}>
                                    <SendButton onPress={confirmRecording}>
                                        <SendButtonText>
                                            Enviar
                                        </SendButtonText>
                                    </SendButton>
                                </Animated.View>
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