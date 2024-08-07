import { Tabs } from 'expo-router';
import React from 'react';
// Ícones
import {Microphone, Gear, Calendar} from "phosphor-react-native";
// ------
// React Native Components
import { View, Dimensions } from 'react-native';
// -----------------------
// Tema
import theme from '../../themes/theme';
import { TaskContextProvider } from '@/context/task_context';
import {CategoryContextProvider} from "@/context/category_context";
// -----------------------

export default function TabLayout() {
  const { width, height } = Dimensions.get('window');

  return (
    <TaskContextProvider>
        <CategoryContextProvider>
            <Tabs
              initialRouteName='home/index'
              screenOptions={{
                headerShown: false,
                tabBarStyle: {
                  backgroundColor: '#F06B41',
                  height: height/100*10,
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
                      width: focused ? 100 : null,
                      height: focused ? 100 : null,
                      borderRadius: focused ? 360 : 0,
                    }}>
                      <Calendar size={60} color={focused ? "white" : "black"} />
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
                      width: focused ? 100 : null,
                      height: focused ? 100 : null,
                      borderRadius: focused ? 360 : 0,
                    }}>
                        <Microphone
                            size={ 60 }
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
                      width: focused ? 100 : null,
                      height: focused ? 100 : null,
                      borderRadius: focused ? 360 : 0,
                    }}>
                      <Gear size={60} color={focused ? "white" : "black"} />
                    </View>
                  ),
                }}
              />
            </Tabs>
        </CategoryContextProvider>
    </TaskContextProvider>
  );
}