import { Background } from "@/components/background"
import CalendarTasks from "@/components/calendarTasks";
import { CaretDown } from "@phosphor-icons/react";
import { FlatList, TouchableOpacity, View } from "react-native"


// type ItemProps = {
//   id: number;
//   label: string;
//   title: string;
//   hour?: string;
//   description?: string;
//   color?: string;
// }

const data = [
  {
    id: 1,
    label: 'Hoje - Manha',
    title: 'Prova de calculo',
    hour: '08:00',
    color: '#2F9CD8',
    description: 'Tenho uma prova de calculo hoje, preciso estudar bastante para conseguir uma boa nota'
  },
  {
    id: 2,
    label: 'Tarde',
    title: 'Reuniao de projeto',
    hour: '14:00',
    color: '#70CE99',
    description: 'Reuniao de projeto com o time de desenvolvimento, vamos discutir sobre o andamento do projeto'
  },
  {
    id: 3,
    label: 'Noite',
    title: 'Entrega de projeto',
    hour: '22:00',
    color: '#EB5757',
    description: 'Entrega do projeto de calculo, preciso finalizar os ultimos detalhes para entregar'
  },
]

// const Item = ({ label, hour, title, description, color }: ItemProps) => (
//   <>
//     <Container>
//       <LabelView>
//         <LabelText>{label}</LabelText>
//         <TouchableOpacity>
//           <CaretDown size={24} style={{ color: 'white' }} />
//         </TouchableOpacity>
//       </LabelView>
//       <View style={{ backgroundColor: {color} }}>
//         <TaskHeader>
//           <TaskText>{title}</TaskText>
//           <TaskText>{hour}</TaskText>
//           <TouchableOpacity>
//             <CaretDown size={24} style={{ color: 'white' }} />
//           </TouchableOpacity>
//         </TaskHeader>
//         <TaskDescription>
//           <TaskDescriptionText>{description}</TaskDescriptionText>
//         </TaskDescription>
//       </View>
//     </Container>
//   </>
// )


export default function Calendar() {
  return (
    <Background>
      <FlatList
        data={data}
        renderItem={({ item }) => <CalendarTasks id={item.id} title={item.title} hour={item.hour} description={item.description} color={item.color} label={item.label} />}
      />
    </Background>
  )
}