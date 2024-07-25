import {LinearGradient} from "expo-linear-gradient";

import {TaskInput} from "@/components/taskInput/input";
import {Animated, Dimensions, Easing, View} from "react-native";
import React, {useContext, useEffect, useRef, useState} from "react";
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
import {TaskContext} from "@/context/task_context";
import {Task} from "@/@clean/shared/domain/entities/task";

export default function TaskModal(props: TaskModalProps){
    const { width } = Dimensions.get('window');

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
    const [errorTaskCategory, setErrorTaskCategory] = useState('');

    const {create, update} = useContext(TaskContext);

    const formatTime = (inputTime: string): string => {
        let formattedInput = inputTime.replace(/\D/g, "");

        switch (formattedInput.length) {
            case 1:
                formattedInput = /^([0-2])$/.test(formattedInput)
                    ? `${formattedInput}`
                    : "";
                break;

            case 2:
                formattedInput = /^([01][1-9]|2[0-4])$/.test(formattedInput)
                    ? `${formattedInput}`
                    : formattedInput.slice(0, 1);
                break;

            case 3:
                formattedInput = /^([0-5])/.test(formattedInput.slice(2, 3))
                    ? `${formattedInput.slice(0, 2)}:${formattedInput.slice(2)}`
                    : `${formattedInput.slice(0, 2)}`;
                break;

            case 4:
                formattedInput = /^([0-5][0-9])/.test(formattedInput.slice(2, 4))
                    ? `${formattedInput.slice(0, 2)}:${formattedInput.slice(2)}`
                    : `${formattedInput.slice(0, 2)}:${formattedInput.slice(2, 3)}`;
                break;
        }
        return formattedInput;
    }

    const handleTime = (inputTime: string) => {
        setTaskTime(formatTime(inputTime));
    }

    const formatDate = (inputDate: string): string => {
        let formattedInput = inputDate.replace(/\D/g, "");

        switch (formattedInput.length) {
            case 1:
                formattedInput = /^([0-3])$/.test(formattedInput)
                    ? `${formattedInput}`
                    : "";
                break;

            case 2:
                formattedInput = /^(0[1-9]|[12][0-9]|3[01])$/.test(formattedInput)
                    ? `${formattedInput}`
                    : formattedInput.slice(0, 1);
                break;

            case 3:
                formattedInput = /^([01])/.test(formattedInput.slice(2, 3))
                    ? `${formattedInput.slice(0, 2)}/${formattedInput.slice(2)}`
                    : `${formattedInput.slice(0, 2)}`;
                break;

            case 4:
                const day = formattedInput.slice(0, 2);
                const month = formattedInput.slice(2, 4);

                if (
                    /^(0[1-9]|[12][0-9]|3[01])$/.test(day) &&
                    ((month !== '00' && month !== "02" &&
                            month !== "04" &&
                            month !== "06" &&
                            month !== "09" &&
                            month !== "11") ||
                        (month === "02" && day <= "29") ||
                        ((month === "04" ||
                                month === "06" ||
                                month === "09" ||
                                month === "11") &&
                            day <= "30"))
                ) {
                    formattedInput = `${formattedInput.slice(0, 2)}/${formattedInput.slice(2)}`;
                } else {
                    formattedInput = `${formattedInput.slice(0, 2)}/${formattedInput.slice(2, 3)}`;
                }
                break;
            case 5:
                formattedInput = /^(2)/.test(formattedInput.slice(4, 5))
                    ? `${formattedInput.slice(0, 2)}/${formattedInput.slice(2, 4)}/${formattedInput.slice(4)}`
                    : `${formattedInput.slice(0, 2)}/${formattedInput.slice(2, 4)}`;
                break;

            case 6:
                formattedInput = /^(2[01])/.test(formattedInput.slice(4, 6))
                    ? `${formattedInput.slice(0, 2)}/${formattedInput.slice(2, 4)}/${formattedInput.slice(4)}`
                    : `${formattedInput.slice(0, 2)}/${formattedInput.slice(2, 4)}/${formattedInput.slice(4, 5)}`;
                break;

            case 7:
                formattedInput = /^(20[2-9]|21[0-9])/.test(
                    formattedInput.slice(4, 7)
                )
                    ? `${formattedInput.slice(0, 2)}/${formattedInput.slice(2, 4)}/${formattedInput.slice(4)}`
                    : `${formattedInput.slice(0, 2)}/${formattedInput.slice(2, 4)}/${formattedInput.slice(4, 6)}`;
                break;

            case 8:
                const yearEnd = parseInt(formattedInput.slice(6, 8));
                if (
                    /^(20[2-9][4-9]|21[0-9][0-9])/.test(
                        formattedInput.slice(4, 8)
                    ) &&
                    (formattedInput.slice(0, 2) !== "29" || yearEnd % 4 === 0)
                ) {
                    formattedInput = `${formattedInput.slice(0, 2)}/${formattedInput.slice(2, 4)}/${formattedInput.slice(4)}`;
                } else {
                    formattedInput = `${formattedInput.slice(0, 2)}/${formattedInput.slice(2, 4)}/${formattedInput.slice(4, 7)}`;
                }
                break;

            default:
                break;
        }

        return formattedInput;
    };

    const handleDate = (inputDate: string) => {
        setTaskDate(formatDate(inputDate));
    };


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

        if(taskName !== '') {
            setErrorTaskName('');
        }
        if(taskTime !== '') {
            setErrorTaskTime('');
        }
        if(taskDate !== '') {
            setErrorTaskDate('');
        }
        if(taskCategory !== '') {
            setErrorTaskCategory('');
        }

    }, [isSwitchOn, taskName, taskTime, taskDate, taskCategory]);

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

    const handleConfirm = async () => {
        // Confirm validation
        if(taskName === '' || taskTime === '' || taskDate === '' || taskCategory === '') {
            if (taskName === '') {
                setErrorTaskName('Nome da task é obrigatório');
            }
            if (taskTime.length < 5) {
                setErrorTaskTime('Horário é obrigatório');
            }
            if (!(taskDate.length === 10 &&
                /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(20[2-9][4-9]|21[0-9][0-9])$/.test(
                    taskDate
                ))){
                setErrorTaskDate('Data é obrigatória');
            }
            if (taskCategory === '') {
                setErrorTaskCategory('Categoria é obrigatória');
            }
            return
        }

        // Request
        //  MISSING CATEGORY AND WEEKDAYS

        const formatedDate = taskDate.split("/").reverse().join("-")
        console.log(formatedDate)
        const formatedTime = taskTime + ":00"
        let response;

        if(props.confirm){
            if (weekDays.length > 0 && isSwitchOn){
                // const task = new Task(null, taskName, formatedDate, taskTime, weekDays,taskDescription, taskLocation, taskCategory, "ACTIVE")
                // const response = await create(task);
            }
            else{
                const task = new Task(
                    null,
                    taskName,
                    formatedDate,
                    formatedTime,
                    taskDescription === '' ? null : taskDescription,
                    taskLocation === '' ? null : taskLocation,
                    "3b447493b2a4203a35284517dbd5e95",
                    "ACTIVE"
                )

                response = await create(task);
            }
        }
        else{
            if(props.taskId === undefined){
                return
            }
            if (weekDays.length > 0 && isSwitchOn){
                // const task = new Task(props.taskId, taskName, formatedDate, taskTime, weekDays,taskDescription, taskLocation, taskCategory, "ACTIVE")
                // const response = await create(task);
            }
            else{
                const task = new Task(props.taskId, taskName, formatedDate, taskTime, taskDescription, taskLocation, "3b447493b2a4203a35284517dbd5e95","ACTIVE")
                response = await update(props.taskId, task);
            }
        }

        if(response){
            console.log(response);
            props.onClose();
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
                            <TaskInput label='Nome da Task*' value={taskName} onChangeText={setTaskName} error={errorTaskName} maxLength={30}/>
                        </TopInputModalView>

                        <TextModalView>
                            <ModalText>Data e Horário*</ModalText>
                        </TextModalView>

                        <TimeRepetitionView>
                            <SmallInputModalView>
                                <TaskInput label='Horário*' placeholder={"00:00"} time={true} value={taskTime} onChangeText={handleTime} error={errorTaskTime} maxLength={5}/>
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
                            <SmallInputModalView style={{width: '55%'}}>
                                <TaskInput label='Data*' placeholder={"__/__/____"} date={true} value={taskDate} onChangeText={handleDate} error={errorTaskDate} maxLength={10}/>
                            </SmallInputModalView>
                        </TimeRepetitionView>

                        <InputModalView>
                            <TaskInput label='Descrição' description={true} value={taskDescription} onChangeText={setTaskDescription} maxLength={100}/>
                        </InputModalView>

                        <InputModalView>
                            <TaskInput label='Local' value={taskLocation} onChangeText={setTaskLocation} maxLength={30}/>
                        </InputModalView>

                        <InputModalView style={{flexDirection: 'row', marginTop: 10}}>
                            <View style={{width: "100%"}}>
                                <TaskInput label='Categoria*' category={true} value={taskCategory} onChangeText={setTaskCategory} maxLength={30} error={errorTaskCategory}/>
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