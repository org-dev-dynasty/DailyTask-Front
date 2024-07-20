import { BackProps } from '@/interfaces/Background';
import theme from '@/themes/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import { View } from 'react-native';

export function Background(props: BackProps) {
  const [themeModeS, setThemeModeS] = useState('dark'); // dark or light theme const
  useFocusEffect(
    useCallback(() => {
        AsyncStorage.getItem('themeMode').then((value) => {
            if (value) {
                setThemeModeS(value);
                // if (props.themeMode !== value) {
                //   setThemeModeS(props.themeMode || value);
                // }
                console.log('themeMode', value);
                console.log('props.themeMode', props.themeMode);
            }
        });
    }
, []));

  return (
    <>
      {themeModeS === 'light' ? (
        <View 
          style={{
            backgroundColor: theme.COLORS.WHITE, 
            flex:1, 
            alignItems: 'center', 
            justifyContent: 'center'
          }}
        >
          {props.children}
        </View>
        ) : (
          <LinearGradient
            colors={['#3C0B50', '#2E083D', '#0F0413']}
            locations={[0, 0.28, 1]}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {props.children}
          </LinearGradient>
        )}
    </>
    
  );
}