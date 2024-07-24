import { Tabs } from 'expo-router';
import React from 'react';
// Ícones
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
// ------
// React Native Components
import { View, Text } from 'react-native';
// -----------------------
// Tema
import theme from '../../themes/theme';
import {Microphone, Gear, Calendar} from "phosphor-react-native";
import { TaskContextProvider } from '@/context/task_context';
// -----------------------

export default function TabLayout() {
  return (
    <TaskContextProvider>
    <Tabs
      initialRouteName='home/index'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#F06B41',
          height: 100,
          borderTopWidth: 0,
        },
      }}>
      {/* Aqui para baixo chama-se as rotas | Sigam o modelo*/}
      <Tabs.Screen
        name="calendar/index"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.COLORS.MAIN,
              top: focused ? -40 : 0,
              width: focused ? 120 : 80,
              height: focused ? 120 : 80,
              borderRadius: 360,
            }}>
              <Calendar size={72} color={focused ? "white" : "black"} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="home/index"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F06B41",
              top: focused ? -40 : 0,
              width: focused ? 120 : 80,
              height: focused ? 120 : 80,
              borderRadius: 360,
            }}>
                <Microphone
                    size={ 72 }
                    color={focused ? "white" : "black"}/>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="configs/index"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F06B41",
              top: focused ? -40 : 0,
              width: focused ? 120 : 80,
              height: focused ? 120 : 80,
              borderRadius: 360,
            }}>
              <Gear size={72} color={focused ? "white" : "black"} />
            </View>
          ),
        }}
      />
    </Tabs>
    </TaskContextProvider>
  );
}
