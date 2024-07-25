import React, { useContext, useEffect, useRef, useState } from 'react';
import { Background } from "@/components/background";
import { Calendar } from 'react-native-calendars';
import { Animated, Dimensions, SafeAreaView } from 'react-native';
import { Bar, CalendarComponent, CalendarContainer, TaskLabel, TasksContainer, TextLabel } from './styles';
import { View, Text, ScrollView } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import theme from '@/themes/theme';
import { CaretDown, CaretUp } from "phosphor-react-native"
import { TaskCard }  from '@/components/taskCard';
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
  const [dots, setDots] = useState<Record<string, {dots: {key: string, color: string}[]}>>()
  const [currentDay, setCurrentDay] = useState('');
  const {getAll} = useContext(TaskContext);

  function toggleCalendar() {
    setExpanded(!expanded);
  }

  // Confg of the dots 
  const vacation = {key: 'vacation', color: 'red'};
  const massage = {key: 'massage', color: 'blue'};
  const workout = {key: 'workout', color: 'green'};

  // tasks
  async function getTasks() {
    const result = await getAll();
    console.log(result);
    
    console.log("Tasks");
    console.log(result.tasks);
    console.log("Dots");
    console.log(result.dots);
    console.log("CurrentDay");
    console.log(result.CurrentDay);

    setCurrentDay(result.CurrentDay);
    setTasks(result.tasks as Record<string, Task[]>);
    setDots(result.dots as Record<string, {dots: {key: string, color: string}[]}>);
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Background>
      <CalendarContainer style={{paddingTop: expanded ? 20 : '10%'}}>
        <CalendarComponent
          style={{ width: width/100*90, display: expanded ? 'flex' : 'none' }}
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
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            console.log('selected day', day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'MMMM yyyy'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log('month changed', month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={false}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          renderArrow={(direction) => (
            <Text style={{ color: '#ffffff', fontSize: 24 }}>{direction === 'left' ? '<' : '>'}</Text>
          )}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // Hide day names. Default = false
          hideDayNames={false}
          // Show week numbers to the left. Default = false
          showWeekNumbers={false}
          // Collection of dates that have to be marked. Default = {}
          markingType={'multi-dot'}
          markedDates={{
            '2024-07-16': {dots: [vacation, massage, workout], selected: true, selectedColor: theme.COLORS.MAIN},
            '2024-07-17': {marked: true},
            '2024-07-18': {marked: true, dotColor: 'red', activeOpacity: 0},
            '2024-07-19': {disabled: true, disableTouchEvent: true}
          }}
        />
        <Bar onPress={toggleCalendar}/>
      </CalendarContainer>
      <TasksContainer style={{top: expanded ? '50%' : '10%'}}>
            {tasks && Object.keys(tasks).map((key, index) => {
              return (
                <View key={index} style={{gap: 8, marginBottom:16}}>
                  <TaskLabel>
                    <TextLabel>{key}</TextLabel>
                    {expanded ? <CaretUp size={24} color={theme.COLORS.WHITE} weight="bold"/> : <CaretDown size={24} color={theme.COLORS.WHITE} weight="bold"/>}
                  </TaskLabel>
                  {tasks[key].map((task, index) => {
                    return (
                      <TaskCard key={index} title={task.task_name} description={task.task_description} date={task.task_date} time={task.task_time} status={task.task_status} color={"#2F9CD8"} color2={"#9CD4F4"}></TaskCard>
                    );
                  })}
                </View>
              );
            }
            )}

      </TasksContainer>
    </Background>
  );
}
