import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Background } from "@/components/background";
import { Calendar } from 'react-native-calendars';
import { Animated, Dimensions, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Bar, CalendarComponent, CalendarContainer, OnlyDisabledText, OnlyDisabledTitle, OnlyDisabledView, TaskLabel, TasksContainer, TextLabel } from './styles';
import { LocaleConfig } from 'react-native-calendars';
import theme from '@/themes/theme';
import { CaretDown, CaretUp, CheckSquare, XSquare } from "phosphor-react-native";
import { TaskCard } from '@/components/taskCard';
import { TaskContext } from '@/context/task_context';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Day from 'react-native-calendars/src/calendar/day';
import { Task } from '@/@clean/shared/domain/entities/task';

// Config the calendar to pt-br
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};

LocaleConfig.defaultLocale = 'pt-br';

export default function CalendarTasks() {
  const { width, height } = Dimensions.get('window');
  const [hiddenCalendarHeight, setHiddenCalendarHeight] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [tasks, setTasks] = useState<Record<string, Task[]>>();
  const [disabledTasks, setDisabledTasks] = useState<Task[]>();
  const [dotsT, setDotsT] = useState<Record<string, {dots: {key: string, color: string}[]}>>();
  const [currentDay, setCurrentDay] = useState('');
  const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>({});
  const [onlyDisabled, setOnlyDisabled] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [tasksHeightExpanded, setTasksHeightExpanded] = useState(0);
  const [tasksHeightNotExpanded, setTasksHeightNotExpanded] = useState(0);
  const { getAll } = useContext(TaskContext);
  const { getDisabledTasks } = useContext(TaskContext);
  const [themeModeS, setThemeModeS] = useState('dark');

  const animationValue = useRef(new Animated.Value(1)).current;

  function toggleCalendar() {
    const toValue = expanded ? 0 : 1;
    if (expanded) {
      Animated.timing(animationValue, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setExpanded(!expanded);
      });
    }
    else {
      setExpanded(!expanded);
      Animated.timing(animationValue, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }

  function toggleDate(date: string) {
    setExpandedDates(prevState => ({
      ...prevState,
      [date]: !prevState[date]
    }));
  }

  async function getTasks() {
    const result = await getAll();
    console.log(result);
    setCurrentDay(result.CurrentDay);
    setTasks(result.tasks as Record<string, Task[]>);
    setDotsT(result.dots as Record<string, {dots: {key: string, color: string}[]}>) ;
    console.log(result.tasks);
    
    // Tranform the dots object to the markedDates object
    const today = new Date().toISOString().split('T')[0]; // Get the current date
    
    const transformedDates = Object.keys(result.dots).reduce((acc, date) => {
      acc[date] = {
        dots: result.dots[date].dots,
      };
      return acc;
    }, {});

    // Add the current day to the markedDates object if it doesn't exist
    if (!transformedDates[today]) {
      transformedDates[today] = {
        selected: true,
        selectedColor: theme.COLORS.MAIN
      };
    }

    setMarkedDates(transformedDates);
  }

  async function getDisabled() {
    const result = await getDisabledTasks();
    setDisabledTasks(result.tasks);
  }

  function getHights() {
    setTasksHeightExpanded(height/10*4)
    setTasksHeightNotExpanded(height/10*7.5)
    setHiddenCalendarHeight(-(height/100*34));
  }

  useEffect(() => {
    getTasks();
    getDisabled();
  }, []);

  useEffect(() => {
    getHights();
  }, [height]);

  useFocusEffect(
    useCallback(() => {
        AsyncStorage.getItem('themeMode').then((value) => {
          console.log(value)
            if (value) {
                setThemeModeS(value);
                console.log(value);
            }
        });
    }, []));

  const translateY = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [hiddenCalendarHeight, 0],
  });
  
  return (
    <Background>
      <CalendarContainer style={{ paddingTop: expanded ? 20 : '10%', backgroundColor: themeModeS === 'dark' ? '#310842' : '#ffffff', 
                          borderColor: themeModeS === 'dark' ? '#310842' : '#000000', borderWidth: 2,
                          transform: [{ translateY }], display: onlyDisabled ? 'none' : 'flex' }}>
        <Animated.View style={{ opacity: animationValue }}>
          <CalendarComponent
            style={{ width: width / 100 * 90, display: expanded ? 'flex' : 'none',  }}
            theme={{
              calendarBackground: themeModeS === 'dark' ? '#ffffff' : '#310842',
              textSectionTitleColor: themeModeS === 'dark' ? theme.COLORS.BLACK : theme.COLORS.WHITE,
              selectedDayBackgroundColor: theme.COLORS.MAIN,
              selectedDayTextColor: theme.COLORS.WHITE,
              todayTextColor: theme.COLORS.MAIN,
              dayTextColor: themeModeS === 'dark' ? theme.COLORS.BLACK : theme.COLORS.WHITE,
              textDisabledColor: '#6e6c7e',
              monthTextColor: themeModeS === 'dark' ? theme.COLORS.BLACK : theme.COLORS.WHITE,
              indicatorColor: themeModeS === 'dark' ? theme.COLORS.BLACK : theme.COLORS.NEGATIVE,
              textDayFontFamily: theme.FONT_FAMILY.MEDIUM,
              textMonthFontFamily: theme.FONT_FAMILY.MEDIUM,
              textDayHeaderFontFamily: theme.FONT_FAMILY.MEDIUM,
              textDayFontWeight: 'normal',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: 'normal',
              textDayFontSize: 16,
              textMonthFontSize: 20,
              textDayHeaderFontSize: 14,
            }}
            onDayPress={(day) => {
              console.log('selected day', day);
            }}
            monthFormat={'MMMM yyyy'}
            onMonthChange={(month) => {
              console.log('month changed', month);
            }}
            hideArrows={false}
            renderArrow={(direction) => (
              <Text style={{ color: themeModeS === 'dark' ? '#ffffff' : '#000000', fontSize: 24 }}>
                {direction === 'left' ? '<' : '>'}
              </Text>
            )}
            hideExtraDays={true}
            disableMonthChange={true}
            hideDayNames={false}
            showWeekNumbers={false}
            markingType={'multi-dot'}
            markedDates={markedDates}
          />
        </Animated.View>
        <Bar onPress={toggleCalendar} style={{ backgroundColor: themeModeS === 'dark' ? '#ffffff' : '#000000' }} />
      </CalendarContainer>
      <TasksContainer style={{ top: expanded ? '50%' : '10%', display: onlyDisabled ? 'none' : 'flex' }}>
        <ScrollView style={{height: expanded ? tasksHeightExpanded: tasksHeightNotExpanded}}>
        {tasks && Object.keys(tasks).map((key, index) => {
          const isExpanded = expandedDates[key];
          return (
            <View key={index} style={{ gap: 8, marginBottom: 16 }}>
              <TouchableOpacity style={{width: '85%', marginHorizontal: 'auto'}} onPress={() => toggleDate(key)}>
                <TaskLabel>
                  <TextLabel>{key}</TextLabel>
                  {!isExpanded ? <CaretUp size={24} color={theme.COLORS.WHITE} weight="bold" /> : <CaretDown size={24} color={theme.COLORS.WHITE} weight="bold" />}
                </TaskLabel>
              </TouchableOpacity>
              {!isExpanded && tasks[key].map((task, index) => (
                <TaskCard
                  key={index}
                  id={task.task_id}
                  title={task.task_name}
                  description={task.task_description}
                  date={task.task_date}
                  time={task.task_hour}
                  status={task.task_status}
                  color={task.category.category_primary_color}
                  color2={task.category.category_secondary_color}
                />
              ))}
            </View>
          );
        })}
        </ScrollView>
      </TasksContainer>
      {/* Completed tasks */}
      {/* Completed tasks button */}
      <TouchableOpacity onPress={() => setOnlyDisabled(!onlyDisabled)} style={{ position: 'absolute', top: '5%', right: '2%' }}>
        {onlyDisabled ?
          <XSquare size={30} color={theme.COLORS.WHITE} weight="bold" />
          :
          <CheckSquare size={30} color={theme.COLORS.WHITE} weight="bold" />
        }
      </TouchableOpacity>
      {/* ---------------------- */}
      <View style={{ width: '80%', display: onlyDisabled ? 'flex' : 'none', position: 'absolute', top: '5%', gap: 16 }}>
        <OnlyDisabledTitle>Tasks inativas</OnlyDisabledTitle>
        <OnlyDisabledText>Essas tasks serão excluídas do sistema após 3 dias, caso não sejam ativadas.</OnlyDisabledText>
      </View>
      <TasksContainer style={{ display: onlyDisabled ? 'flex' : 'none', top: '15%' }}>
        <ScrollView style={{height: expanded ? tasksHeightExpanded: tasksHeightNotExpanded}}>
        {disabledTasks && disabledTasks.map((task, index) => (
          <TaskCard
            key={index}
            id={task.task_id}
            title={task.task_name}
            description={task.task_description}
            date={task.task_date}
            time={task.task_hour}
            status={task.task_status}
            color={task.category.category_primary_color}
            color2={task.category.category_secondary_color}
          />
        ))}
        </ScrollView>
      </TasksContainer>
    </Background>
  );
} 

