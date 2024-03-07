import { StyleSheet, ImageBackground, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, XStack, YStack } from 'tamagui'
import Tenis from '@/components/login/Tenis';
import TopScreen from '@/components/login/TopScreen';
import LoginBody from './login/LoginBody';
import Footer from '@/components/login/Footer';
import { existed } from '@/api/localStorage'
import { router } from 'expo-router'
import Loading from '@/components/Loading';
const Login = () => {
  const [isUser, setIsUser] = useState(true)
  const [userType, setUserType] = useState('')
  const [buttonPlayerState, setButtonPlayerState] = useState({
    backgroundColor: '#A9D05C',
    borderColor: "#FFFFFF",
  });
  const [buttonCoachState, setButtonCoachState] = useState({
    backgroundColor: '#A9D05C',
    borderColor: "#FFFFFF",
  });
  const onPlayer = () => {
    setUserType("Player")
    setButtonPlayerState({
      backgroundColor: '#3A4D6C',
      borderColor: "#A9D05C",
    });
    setButtonCoachState({
      backgroundColor: '#A9D05C',
      borderColor: "#FFFFFF",
    });
  }

  const onCoach = () => {
    setUserType("Coach")
    setButtonCoachState({
      backgroundColor: '#3A4D6C',
      borderColor: '#A9D05C',
    });
    setButtonPlayerState({
      backgroundColor: '#A9D05C',
      borderColor: "#FFFFFF",
    });
  }
  useEffect(() => {
    existed("userInfo").then((data: boolean) => {
      setIsUser(data)
      if (data) {
        router.navigate('/(tabs)');
      }
    })
  }, [isUser])
  if (isUser) return <Loading />
  return (
    <ImageBackground
      source={require('@/assets/images/backFront.png')}
      style={styles.backgroundImage}
      resizeMode="cover">
      <ScrollView >

        <YStack flex={1} paddingTop={Platform.OS === 'ios' ? 90 : 20} gap={'$4'}>
          <YStack alignItems="center">
            <TopScreen />
            <XStack marginTop={-60} gap={"$4"} >
              <Tenis icon={<Image
                source={require('@/assets/images/racket.png')} />}
                text={"Player"}
                backgroundColor={buttonPlayerState.backgroundColor}
                borderColor={buttonPlayerState.borderColor}
                onPress={onPlayer}
              />
              <Tenis icon={<Image
                source={require('@/assets/images/whisle.png')} />}
                text={"Coach"}
                backgroundColor={buttonCoachState.backgroundColor}
                borderColor={buttonCoachState.borderColor}
                onPress={onCoach}
              // '#A9D05C'
              // '#3A4D6C'
              />
            </XStack>
          </YStack>
          <YStack alignItems="center">
            <LoginBody userType={userType} />
          </YStack>
          <Footer userType={userType} />
        </YStack>
      </ScrollView>
    </ImageBackground>
  )
}
export default Login;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
