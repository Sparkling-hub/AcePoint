import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../tamagui.config';

import { ChevronLeft, X } from '@tamagui/lucide-icons';
import Colors from '@/constants/Colors';
import CustomHeader from '@/components/CustomHeader';

import { USER_ROLE } from '@/constants/User';
import { TouchableOpacity } from 'react-native';
import HeaderText from '@/components/HeaderText';

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

const AccountHeader = () => {
  return (
    <CustomHeader leftIcon={<X size={'$2.5'} color={Colors.secondary} />} />
  );
};

const EditProfileHeader = () => {
  return (
    <CustomHeader
      leftIcon={<ChevronLeft size={'$2.5'} color={Colors.secondary} />}
      title={USER_ROLE === 'coach' ? 'Edit Profile' : ''}
      rightContent={
        <TouchableOpacity onPress={() => console.log('pressed')}>
          <HeaderText text="Save" />
        </TouchableOpacity>
      }
    />
  );
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
    MontserratMedium: require('../assets/fonts/Montserrat-Medium.ttf'),
    MontserratBold: require('../assets/fonts/Montserrat-Bold.ttf'),
    MontserratExtraBold: require('../assets/fonts/Montserrat-ExtraBold.ttf'),
    MontserratSemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
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
    <TamaguiProvider
      config={tamaguiConfig}
      defaultTheme={colorScheme === 'dark' ? 'dark' : 'light'}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName='login'>

          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="user/account"
            options={{
              headerShadowVisible: false,
              header: AccountHeader,
            }}
          />
          <Stack.Screen
            name="user/edit-profile"
            options={{
              headerShadowVisible: false,
              header: EditProfileHeader,
            }}
          />
          <Stack.Screen
            name="login"
            options={{
              headerShown: false
            }}
          />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
