import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Background } from "@/components/background";
import { Calendar } from 'react-native-calendars';
import { Dimensions, Text, View } from 'react-native';
import { Bar, CalendarComponent, CalendarContainer, TaskLabel, TasksContainer, TextLabel } from './styles';
import { LocaleConfig } from 'react-native-calendars';
import theme from '@/themes/theme';
import { CaretDown } from "phosphor-react-native";
import { TaskCard } from '@/components/taskCard';
import { TaskContext } from '@/context/task_context';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Day from 'react-native-calendars/src/calendar/day';

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
  const { width } = Dimensions.get('window');
  const [expanded, setExpanded] = useState(true);
  const [tasks, setTasks] = useState([]);
  const { getAll } = useContext(TaskContext);
  const [themeModeS, setThemeModeS] = useState('dark');

  function toggleCalendar() {
    setExpanded(!expanded);
  }

  // Config of the dots 
  const vacation = { key: 'vacation', color: 'red' };
  const massage = { key: 'massage', color: 'blue' };
  const workout = { key: 'workout', color: 'green' };

  // tasks
  async function getTasks() {
    const result = await getAll();
    // console.log(result);
  }

  useEffect(() => {
    getTasks();
  }, []);

  useFocusEffect(
    useCallback(() => {
        AsyncStorage.getItem('themeMode').then((value) => {
          console.log(value)
            if (value) {
                setThemeModeS(value);
                console.log(value);
            }
        });
    }
, []));

  return (
    <Background>
      <CalendarContainer style={{ paddingTop: expanded ? 20 : '10%', backgroundColor: themeModeS === 'dark' ? '#310842' : '#ffffff' }}>
        <CalendarComponent
          style={{ width: width / 100 * 90, display: expanded ? 'flex' : 'none',  }}
          theme={{
            calendarBackground: themeModeS === 'dark' ? '#310842' : '#ffffff',
            textSectionTitleColor: themeModeS === 'dark' ? theme.COLORS.WHITE : theme.COLORS.BLACK,
            selectedDayBackgroundColor: theme.COLORS.MAIN,
            selectedDayTextColor: theme.COLORS.WHITE,
            todayTextColor: theme.COLORS.MAIN,
            dayTextColor: themeModeS === 'dark' ? theme.COLORS.WHITE : theme.COLORS.BLACK,
            textDisabledColor: '#6e6c7e',
            monthTextColor: themeModeS === 'dark' ? theme.COLORS.WHITE : theme.COLORS.BLACK,
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
          markedDates={{
            '2024-07-16': { dots: [vacation, massage, workout], selected: true, selectedColor: theme.COLORS.MAIN },
            '2024-07-17': { marked: true },
            '2024-07-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
            '2024-07-19': { disabled: true, disableTouchEvent: true }
          }}
        />
        <Bar onPress={toggleCalendar} style={{ backgroundColor: themeModeS === 'dark' ? '#ffffff' : '#000000' }} />
      </CalendarContainer>
      <TasksContainer style={{ top: expanded ? '50%' : '10%' }}>
        <View>
          <TaskLabel>
            <TextLabel style={{ color: themeModeS === 'dark' ? '#ffffff' : '#000000' }}>Hoje</TextLabel>
            <CaretDown size={24} color={themeModeS === 'dark' ? '#ffffff' : '#000000'} weight="bold" />
          </TaskLabel>
          <TaskCard title='Médico' description='Ir ao consultório x as 17:20' date='10/11/2024' time='17:20' status='open' color='#2F9CD8' color2='#9CD4F4' />
        </View>
      </TasksContainer>
    </Background>
  );
} 

