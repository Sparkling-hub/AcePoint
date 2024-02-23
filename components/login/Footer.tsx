import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import GoogleAuthAndroid from '@/components/GoogleAuthAndroid';
import GoogleAuthIOS from '@/components/GoogleAuthIOS';
import { Image, Stack, XStack, YStack, Button, Text } from 'tamagui';
import { router } from 'expo-router';
import { styles } from '../GoogleStyleButton';
WebBrowser.maybeCompleteAuthSession();
type PlatformType = 'ios' | 'android';

interface GoogleAuthProps {
  platform: PlatformType;
  userType: string;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ platform, userType }) => {
  if (platform === 'ios') {
    return <GoogleAuthIOS userType={userType} />;
  } else if (platform === 'android') {
    return <GoogleAuthAndroid userType={userType} />;
  }
};
const Footer = ({ userType }: { userType: string }) => {


  const redirectSignUp = () => {
    if (userType === 'Player') {
      router.push('/signUp/playersignup');
    }
    if (userType === 'Coach') {
      router.push('/signUp/coachsignup');
    }
  };
  return (
    <Stack alignItems="center" gap={'$2'}>
      <Button style={styles.button} onPress={redirectSignUp}>
        Sign Up
      </Button>
      <Text
        style={{
          fontFamily: 'MontserratMedium',
          fontSize: 14,
          fontWeight: 400,
          lineHeight: 17.07,
          color: '#ffff',
        }}>
        Or
      </Text>
      <YStack gap={'$4'} alignItems="center">
        <XStack gap={'$5'}>
          <Button style={styles.ouath}>
            <Image
              source={require('@/assets/images/appleIcon.png')}
              style={[{ width: 23, height: 28 }]}
            />
          </Button>
          <GoogleAuth userType={userType} platform={Platform.OS as PlatformType} />
        </XStack>

        <Image
          source={require('@/assets/images/sparking.png')}
          style={[{ width: 173, height: 32, marginBottom: 20 }]}
        />
      </YStack>
    </Stack>
  );
};
export default Footer;