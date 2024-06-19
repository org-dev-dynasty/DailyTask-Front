import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      initialRouteName='login'
    >
      <Stack.Screen name='index' />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Aqui para baixo chama-se as rotas */}
      <Stack.Screen name='login' />
      <Stack.Screen name='signUp' />
      <Stack.Screen name='forgetPassword' />
    </Stack>
  );
}
