import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  return (
    <Tabs
      initialRouteName='home/index'
      screenOptions={{
        headerShown: false,
      }}>
      {/* Aqui para baixo chama-se as rotas | Sigam o modelo*/}
      <Tabs.Screen
        name="calendar/index"
        options={{
          title: 'Calendário',
        }}
      />
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarStyle: {
            backgroundColor: '#F06B41',
          },
          }}
      />
      <Tabs.Screen
        name="configs/index"
        options={{
          title: 'Configurações',
        }}
      />
    </Tabs>
  );
}
