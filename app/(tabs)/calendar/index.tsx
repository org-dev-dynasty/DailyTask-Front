import { Background } from "@/components/background";
import { Container, Section, TaskText } from "./styles";
import { TaskSection } from "@/components/taskSection";
import React, { useRef, useCallback } from 'react';
import { ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import { Dimensions, FlatList, ScrollView, View } from 'react-native';


// const leftArrowIcon = require('../../../assets/appImages/previous.png');
// const rightArrowIcon = require('../../../assets/appImages/next.png');

const taskSections = [
  { label: 'Hoje - Manhã', tasks: [{ title: 'Prova de Calculo', color: '#2F9CD8', content: 'Conteúdo da manhã de hoje' }] },
  { label: 'Tarde', tasks: [{ title: 'Estudar', color: '#70CE99', content: 'Conteúdo da tarde' }] },
  { label: 'Noite', tasks: [{ title: 'Jantar', color: '#EB5757', content: 'Conteúdo da noite' }] },
];

type ItemProps = { label: string, tasks: any, index: number };

const Item = ({ label, tasks, index }: ItemProps) => (
  <Container style={{ flex: 1 }}>
    <TaskSection key={index} label={label} tasks={tasks} />
    <Section>
      <TaskText>Março de 11 a Março de 16</TaskText>
      <TaskText>Nada ainda</TaskText>
    </Section>
  </Container>
);

export default function Calendario() {


  return (
    <Background style={{ flex: 1  }}>
      <View style={{ width: '100%', position: 'static' }}>
        <CalendarProvider date="2024-06-27" style={{ width: '100%' }} >
          <ExpandableCalendar
            initialPosition={ExpandableCalendar.positions.OPEN}
            firstDay={1}
            markedDates={{
              '2023-03-10': { selected: true, marked: true },
              '2023-03-11': { marked: true },
              '2023-03-12': { marked: true, dotColor: 'red', activeOpacity: 0 },
            }}

          />
          {/* <WeekCalendar /> */}
        </CalendarProvider>
      </View>
      {/* <FlatList
        data={taskSections}
        renderItem={({item}) => <Item label={item.label} tasks={item.tasks} index={0} />}
        style={{ width: '100%' }} 
      /> */}
      <ScrollView style={{ width: '100%', height: '30%', paddingTop: 10 }}>
        <Container style={{ flex: 1, alignItems: 'center', position: 'static' }} >
          {taskSections.map((section: any, index: any) => (
            <TaskSection key={index} label={section.label} tasks={section.tasks} />
          ))}
        <Section>
            <TaskText>Março de 11 a Março de 16</TaskText>
            <TaskText>Nada ainda</TaskText>
          </Section>
        </Container>
      </ScrollView>
    </Background>
  );
}

// import React, {useRef, useCallback} from 'react';
// import {StyleSheet} from 'react-native';
// import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';
// import testIDs from '../testIDs';
// import {agendaItems, getMarkedDates} from '../mocks/agendaItems';
// import AgendaItem from '../mocks/AgendaItem';
// import {getTheme, themeColor, lightThemeColor} from '../mocks/theme';

// const leftArrowIcon = require('../img/previous.png');
// const rightArrowIcon = require('../img/next.png');
// const ITEMS: any[] = agendaItems;

// interface Props {
//   weekView?: boolean;
// }

// const ExpandableCalendarScreen = (props: Props) => {
//   const {weekView} = props;
//   const marked = useRef(getMarkedDates());
//   const theme = useRef(getTheme());
//   const todayBtnTheme = useRef({
//     todayButtonTextColor: themeColor
//   });

//   // const onDateChanged = useCallback((date, updateSource) => {
//   //   console.log('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
//   // }, []);

//   // const onMonthChange = useCallback(({dateString}) => {
//   //   console.log('ExpandableCalendarScreen onMonthChange: ', dateString);
//   // }, []);

//   const renderItem = useCallback(({item}: any) => {
//     return <AgendaItem item={item}/>;
//   }, []);

//   return (
//     <CalendarProvider
//       date={ITEMS[1]?.title}
//       // onDateChanged={onDateChanged}
//       // onMonthChange={onMonthChange}
//       showTodayButton
//       // disabledOpacity={0.6}
//       theme={todayBtnTheme.current}
//       // todayBottomMargin={16}
//     >
//       {weekView ? (
//         <WeekCalendar testID={testIDs.weekCalendar.CONTAINER} firstDay={1} markedDates={marked.current}/>
//       ) : (
//         <ExpandableCalendar
//           testID={testIDs.expandableCalendar.CONTAINER}
//           // horizontal={false}
//           // hideArrows
//           // disablePan
//           // hideKnob
//           // initialPosition={ExpandableCalendar.positions.OPEN}
//           // calendarStyle={styles.calendar}
//           // headerStyle={styles.header} // for horizontal only
//           // disableWeekScroll
//           theme={theme.current}
//           // disableAllTouchEventsForDisabledDays
//           firstDay={1}
//           markedDates={marked.current}
//           leftArrowImageSource={leftArrowIcon}
//           rightArrowImageSource={rightArrowIcon}
//           // animateScroll
//           // closeOnDayPress={false}
//         />
//       )}
//       <AgendaList
//         sections={ITEMS}
//         renderItem={renderItem}
//         // scrollToNextEvent
//         sectionStyle={styles.section}
//         // dayFormat={'yyyy-MM-d'}
//       />
//     </CalendarProvider>
//   );
// };

// export default ExpandableCalendarScreen;

// const styles = StyleSheet.create({
//   calendar: {
//     paddingLeft: 20,
//     paddingRight: 20
//   },
//   header: {
//     backgroundColor: 'lightgrey'
//   },
//   section: {
//     backgroundColor: lightThemeColor,
//     color: 'grey',
//     textTransform: 'capitalize'
//   }
// });


