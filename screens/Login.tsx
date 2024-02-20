import { StyleSheet,ImageBackground, Platform } from 'react-native'
import React from 'react'
import { Image, ScrollView,XStack, YStack } from 'tamagui'
import Tenis from '@/components/login/Tenis';
import TopScreen from '@/components/login/TopScreen';
import LoginBody from './login/LoginBody';
import Footer from '@/components/login/Footer';

const Login = () => {
  return (
      <ImageBackground
        source={require('@/assets/images/backFront.png')} 
        style={styles.backgroundImage}
        resizeMode="cover">
      <ScrollView >
          
      <YStack flex={1} paddingTop={Platform.OS === 'ios' ? 90 : 20} gap={'$4'}>
      <YStack alignItems="center">
          <TopScreen/>  
          <XStack marginTop={-50} gap={"$4"} >
              <Tenis icon={<Image
                source={require('@/assets/images/racket.png')} />}
                text={"Player"} 
              />
              <Tenis icon={<Image
                source={require('@/assets/images/whisle.png')} />}
                text={"Coach"} 
                backgroundColor='#A9D05C'
                borderColor="#FFFFFF"
              />
          </XStack>
        </YStack>
          <YStack alignItems="center">
          <LoginBody/>
          </YStack>
            <Footer/>
          </YStack>
    </ScrollView>
          </ImageBackground>

        
 
  )
}

export default Login

const styles = StyleSheet.create({
 
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  
})