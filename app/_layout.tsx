import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts, Jost_300Light, Jost_400Regular, Jost_500Medium, Jost_700Bold } from '@expo-google-fonts/jost';
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

  let [fontsLoaded] = useFonts({
    Jost_300Light,
    Jost_400Regular,
    Jost_500Medium,
    Jost_700Bold,
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
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Aqui para baixo chama-se as rotas */}
      <Stack.Screen name='login/index' options={{ headerShown: false }} />
      <Stack.Screen name='signUp/index' options={{ headerShown: false }} />
      <Stack.Screen name='forgetPassword/index' options={{ headerShown: false }} />
      <Stack.Screen name='newPassword/index' options={{ headerShown: false }} />
    </Stack>
  );
}
