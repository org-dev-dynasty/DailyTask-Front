import {LinearGradient} from "expo-linear-gradient";

import {TaskInput} from "@/components/taskInput/input";
import {Animated, Dimensions, Easing, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {
    ButtonsView,
    ButtonTxt,
    CancelButton, ConfirmButton,
    Container, DisclaimerTxt, DisclaimerView,
    InputModalView,
    ModalText,
    ModalView, RepetitionTxt, ShadeView,
    SmallInputModalView, SwitchTouchable, SwitchKnob, SwitchContainer,
    TextModalView, TimeRepetitionView,
    TopInputModalView, WeekDaysView, WeekButton
} from "@/components/taskModal/styles";
import {TaskModalProps} from "@/interfaces/TaskModal";
import theme from "@/themes/theme";
import {transparent} from "react-native-paper/lib/typescript/styles/themes/v2/colors";

export default function TaskModal(props: TaskModalProps){
    const { width, height } = Dimensions.get('window');

    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const position = useRef(new Animated.Value(2)).current;
    const backgroundColor = useRef(new Animated.Value(0)).current;
    const dateTranslateX = useRef(new Animated.Value(0)).current;
    const weekdaysTranslateX = useRef(new Animated.Value(-width * 0.9)).current; // Start outside of view

    // Input Values
    const [taskName, setTaskName] = useState('');
    const [taskTime, setTaskTime] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskLocation, setTaskLocation] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [weekDays, setWeekDays] = useState<number[]>([]);

    // Error Messages
    const [errorTaskName, setErrorTaskName] = useState('');
    const [errorTaskTime, setErrorTaskTime] = useState('');
    const [errorTaskDate, setErrorTaskDate] = useState('');
    const [errorTaskDescription, setErrorTaskDescription] = useState('');
    const [errorTaskLocation, setErrorTaskLocation] = useState('');
    const [errorTaskCategory, setErrorTaskCategory] = useState('');


    useEffect(() => {
        Animated.timing(position, {
            toValue: isSwitchOn ? 26 : 2,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.out(Easing.ease),
        }).start();

        Animated.timing(backgroundColor, {
            toValue: isSwitchOn ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
            easing: Easing.out(Easing.ease),
        }).start();

        Animated.timing(dateTranslateX, {
            toValue: isSwitchOn ? -300 : 0,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start();

        Animated.timing(weekdaysTranslateX, {
            toValue: isSwitchOn ? 0 : -width * 0.9,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start();
    }, [isSwitchOn]);

    const toggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    const interpolatedBackgroundColor = backgroundColor.interpolate({
        inputRange: [0, 1],
        outputRange: [theme.COLORS.GRAY, theme.COLORS.MAIN]
    });

    const toggleButton = (index: number) => {
        setWeekDays(prevState =>
            prevState.includes(index)
                ? prevState.filter(buttonIndex => buttonIndex !== index)
                : [...prevState, index]
        );
    };

    const handleConfirm = () => {
        // Validation of email and password
        // if (email === '' && password === '') {
        //     console.log('Email vazio');
        //     console.log('Senha vazia');
        //     setErroEmail('Preencha todos os campos');
        //     setErroPassword('Preencha todos os campos');
        //     return;
        // }
        // if (email === '') {
        //     console.log('Email vazio');
        //     setErroEmail('Preencha o campo email');
        //     return;
        // }
        // if (password === '') {
        //     console.log('Senha vazia');
        //     setErroPassword('Preencha o campo senha');
        //     return;
        // }
        // Reuquest to login
        // const result = await login(email, password);
        // if (result) {
        //     alert('Login efetuado com sucesso');
        //     await AsyncStorage.setItem('id_token', result.id_token);
        //     await AsyncStorage.setItem('token', result.access_token);
        //     await AsyncStorage.setItem('refresh_token', result.refresh_token);
        //     router.replace('/home');
        // }
        if (weekDays.length > 0 && isSwitchOn){
            console.log(weekDays)
        }
    }

    return (
        <ModalView>
            <ShadeView>
                <Container>
                    <LinearGradient
                        colors={['#3C0B50', '#2E083D', '#0F0413']}
                        locations={[0, 0.28, 1]}
                        style={{
                            height: '100%',
                            width: "100%",
                            borderRadius: 15,
                        }}
                    >
                        <TopInputModalView>
                            <TaskInput label='Nome da Task*' value={taskName} onChangeText={setTaskName} error={errorTaskName}/>
                        </TopInputModalView>

                        <TextModalView>
                            <ModalText>Data e Horário*</ModalText>
                        </TextModalView>

                        <TimeRepetitionView>
                            <SmallInputModalView>
                                <TaskInput label='Horário' placeholder={"00:00"} time={true} value={taskTime} onChangeText={setTaskName} error={errorTaskTime}/>
                            </SmallInputModalView>

                            <RepetitionTxt>Repetição</RepetitionTxt>
                            <Animated.View>
                                <SwitchTouchable onPress={toggleSwitch}>
                                    <SwitchContainer style={{ backgroundColor: interpolatedBackgroundColor }}>
                                        <SwitchKnob style={{ left: position }} />
                                    </SwitchContainer>
                                </SwitchTouchable>
                            </Animated.View>
                        </TimeRepetitionView>

                        <Animated.View style={{ transform: [{ translateX: weekdaysTranslateX }] }}>
                            <WeekDaysView>
                                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
                                    <WeekButton
                                        key={index}
                                        onPress={() => toggleButton(index)}
                                        style={{
                                            backgroundColor: weekDays.includes(index) ? theme.COLORS.MAIN : "transparent",
                                            borderColor: weekDays.includes(index) ? "transparent" : theme.COLORS.WHITE,
                                        }}
                                    >
                                        <RepetitionTxt>{day}</RepetitionTxt>
                                    </WeekButton>
                                ))}
                            </WeekDaysView>
                        </Animated.View>

                        <TimeRepetitionView style={{ transform: [{ translateX: dateTranslateX }] }}>
                            <SmallInputModalView>
                                <TaskInput label='Data' placeholder={"__/__/__"} date={true}/>
                            </SmallInputModalView>
                        </TimeRepetitionView>

                        <InputModalView>
                            <TaskInput label='Descrição' description={true}/>
                        </InputModalView>

                        <InputModalView>
                            <TaskInput label='Local'/>
                        </InputModalView>

                        <InputModalView style={{flexDirection: 'row', marginTop: 10}}>
                            <View style={{width: "100%"}}>
                                <TaskInput label='Categoria' category={true}/>
                            </View>
                        </InputModalView>

                        <DisclaimerView>
                            <DisclaimerTxt>Os espaços marcados com “*” são obrigatórios.</DisclaimerTxt>
                        </DisclaimerView>

                        <ButtonsView>
                            <CancelButton onPress={props.onClose}>
                                <ButtonTxt>Cancelar</ButtonTxt>
                            </CancelButton>
                            <ConfirmButton onPress={handleConfirm}>
                                <ButtonTxt>Confirmar</ButtonTxt>
                            </ConfirmButton>

                        </ButtonsView>


                    </LinearGradient>
                </Container>
            </ShadeView>
        </ModalView>
    )
}