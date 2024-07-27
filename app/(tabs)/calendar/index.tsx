import React, { useContext, useEffect, useRef, useState } from 'react';
import { Background } from "@/components/background";
import { Calendar } from 'react-native-calendars';
import { Animated, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { Bar, CalendarComponent, CalendarContainer, TaskLabel, TasksContainer, TextLabel } from './styles';
import { LocaleConfig } from 'react-native-calendars';
import theme from '@/themes/theme';
import { CaretDown, CaretUp } from "phosphor-react-native"
import { TaskCard } from '@/components/taskCard';
import { TaskContext } from '@/context/task_context';
import { Task } from '@/@clean/shared/domain/entities/task';

// Config the calendar to pt-br
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar.',
    'Abr.',
    'Mai.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.'
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};

LocaleConfig.defaultLocale = 'pt-br';

export default function CalendarTasks() {
  const { width, height } = Dimensions.get('window');
  const [expanded, setExpanded] = useState(true);
  const [tasks, setTasks] = useState<Record<string, Task[]>>();
  const [dots, setDots] = useState<Record<string, {dots: {key: string, color: string}[]}>>();
  const [currentDay, setCurrentDay] = useState('');
  const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>({});
  const { getAll } = useContext(TaskContext);

  const animationValue = useRef(new Animated.Value(1)).current;

  function toggleCalendar() {
    const toValue = expanded ? 0 : 1;
    Animated.timing(animationValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setExpanded(!expanded);
    });
  }

  function toggleDate(date: string) {
    setExpandedDates(prevState => ({
      ...prevState,
      [date]: !prevState[date]
    }));
  }

  async function getTasks() {
    const result = await getAll();
    setCurrentDay(result.CurrentDay);
    setTasks(result.tasks as Record<string, Task[]>);
    setDots(result.dots as Record<string, {dots: {key: string, color: string}[]}>);
  }

  useEffect(() => {
    getTasks();
  }, []);

  const translateY = animationValue.interpolate({
    inputRange: [0, 1],
    // outputRange: [-height, 0],
    outputRange: [-height + 550, 0],
  });

  const vacation = {key: 'vacation', color: 'red'};
  const massage = {key: 'massage', color: 'blue'};
  const workout = {key: 'workout', color: 'green'};

  return (
    <Background>
      <CalendarContainer style={{transform: [{ translateY }]}}>
        <Animated.View style={{opacity: animationValue}}>
          <CalendarComponent
            style={{ width: width / 100 * 90 }}
            theme={{
              calendarBackground: '#310842',
              textSectionTitleColor: theme.COLORS.WHITE,
              selectedDayBackgroundColor: theme.COLORS.MAIN,
              selectedDayTextColor: theme.COLORS.WHITE,
              todayTextColor: theme.COLORS.MAIN,
              dayTextColor: theme.COLORS.WHITE,
              textDisabledColor: '#6e6c7e',
              monthTextColor: theme.COLORS.WHITE,
              indicatorColor: theme.COLORS.WHITE,
              textDayFontFamily: theme.FONT_FAMILY.MEDIUM,
              textMonthFontFamily: theme.FONT_FAMILY.MEDIUM,
              textDayHeaderFontFamily: theme.FONT_FAMILY.MEDIUM,
              textDayFontWeight: theme.FONT_SIZE.SM,
              textMonthFontWeight: theme.FONT_SIZE.MD,
              textDayHeaderFontWeight: theme.FONT_SIZE.SM,
              textDayFontSize: 16,
              textMonthFontSize: 20,
              textDayHeaderFontSize: 14
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
              <Text style={{ color: '#ffffff', fontSize: 24 }}>{direction === 'left' ? '<' : '>'}</Text>
            )}
            hideExtraDays={true}
            disableMonthChange={true}
            hideDayNames={false}
            showWeekNumbers={false}
            markingType={'multi-dot'}
            markedDates={{
              '2024-07-16': {dots: [vacation, massage, workout], selected: true, selectedColor: theme.COLORS.MAIN},
              '2024-07-17': {marked: true},
              '2024-07-18': {marked: true, dotColor: 'red', activeOpacity: 0},
              '2024-07-19': {disabled: true, disableTouchEvent: true}
            }}
          />
        </Animated.View>
        <Bar onPress={toggleCalendar}/>
      </CalendarContainer>
      <TasksContainer style={{top: expanded ? '50%' : '10%'}}>
        {tasks && Object.keys(tasks).map((key, index) => {
          const isExpanded = expandedDates[key];
          return (
            <View key={index} style={{gap: 8, marginBottom:16}}>
              <TouchableOpacity onPress={() => toggleDate(key)}>
                <TaskLabel>
                  <TextLabel>{key}</TextLabel>
                  {isExpanded ? <CaretUp size={24} color={theme.COLORS.WHITE} weight="bold"/> : <CaretDown size={24} color={theme.COLORS.WHITE} weight="bold"/>}
                </TaskLabel>
              </TouchableOpacity>
              {isExpanded && tasks[key].map((task, index) => (
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
      </TasksContainer>
    </Background>
  );
}
