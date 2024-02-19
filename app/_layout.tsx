import '../tamagui-web.css';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from '@/components/useColorScheme';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../tamagui.config';
import SignUpPlayer from '@/screens/SignUpPlayer';
import Login from '@/screens/Login';
import SignUpCoach from '@/screens/signUpCoach';
import Information from '@/screens/coach/Information';
import Trail from '@/screens/coach/Trail';
import LoginPlayer from '@/screens/login/LoginPlayer';
import LoginCoach from '@/screens/login/LoginCoach';
import View from '@/screens/View';
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBold: require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
         {/* <SignUpPlayer/>  */}
          {/* <Login/>  */}
          {/* <SignUpCoach/> */}
          {/* <Information/> */}
          {/* <SignUpCoach/> */}
           {/* <LoginPlayer />  */}
           <View />
          {/* <LoginCoach/> */}

      </ThemeProvider>
    </TamaguiProvider>
  );
}