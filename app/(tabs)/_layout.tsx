import { Tabs } from 'expo-router';
import React from 'react';
// Ícones
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
// ------
// React Native Components
import { Platform, View } from 'react-native';
// -----------------------

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName='home/index'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#F06B41',
          height: 100,
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
              backgroundColor: "#F06B41",
              top: focused ? -40 : 0,
              width: focused ? 120 : 80,
              height: focused ? 120 : 80,
              borderRadius: 360,
            }}>
              <AntDesign name="calendar" size={60} color="white" />
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
              <MaterialCommunityIcons 
                name="microphone-outline" 
                size={ 72 }
                color="white" 
              />
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
              <Octicons name="gear" size={60} color="white" />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
