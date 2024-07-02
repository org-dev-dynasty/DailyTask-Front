import { Background } from "@/components/background"
import CalendarTasks, { ItemProps } from "@/components/calendarTasks";
import { useState } from "react";
import { FlatList } from "react-native"
import { View, Text, StyleSheet } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider } from 'react-native-calendars';

const data: Array<ItemProps> = [
  {
    label: 'Hoje - Manha',
    tasks: [
      {
        title: 'Reuniao de projeto',
        hour: '14:00',
        color: '#70CE99',
        secondaryColor: '#4A9C5A',
        description: 'Reuniao de projeto com o time de desenvolvimento, vamos discutir sobre o andamento do projeto'
      },
      {
        title: 'Prova de calculo',
        hour: '08:00',
        color: '#2F9CD8',
        secondaryColor: '#1A6A9C',
        description: 'Tenho uma prova de calculo hoje, preciso estudar bastante para conseguir uma boa nota'
      }
    ]
  },
]


export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <Background>
      <CalendarProvider
        date={selectedDate}
        onDateChanged={(date) => setSelectedDate(date)}
        showTodayButton
      >
        <ExpandableCalendar
          // initialPosition='open'
          firstDay={1}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' }
          }}
        />
        <AgendaList
          sections={[
            {
              title: 'Agenda',
              data: data.filter(data => data.label === selectedDate)
            }
          ]}
          renderItem={({ item }) => <CalendarTasks label={item.label} tasks={item.tasks} />}
        />
        {/* <FlatList
        data={data}
        renderItem={({ item }) => <CalendarTasks label={item.label} tasks={item.tasks} />}
        style={{ width: '90%' }}
      /> */}
      </CalendarProvider>
    </Background>
  )
}