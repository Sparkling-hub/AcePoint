import { StyleSheet } from 'react-native'
import React from 'react'
import { Image, Stack, XStack, YStack } from 'tamagui'
import { Button,Text } from 'tamagui'

const Footer = () => {
  return (
    <Stack alignItems='center' gap={'$4'}>
    <Button  style={styles.button}>Sign Up</Button>
    <Text style={{ fontFamily: 'MontserratMedium',fontSize:14,
            fontWeight:400,
            lineHeight:17.07 
          }}
            >
      Or
    </Text>
    <YStack gap={'$5'} alignItems='center' >
    <XStack gap={'$5'}>
    <Button  style={styles.ouath}><Image
    source={require('@/assets/images/appleIcon.png')} 
    style={[{ width: 23, height: 28 }]}
    /></Button>
    <Button  style={styles.ouath}><Image
    source={require('@/assets/images/googleIcon.png')} 
    style={[{ width: 27.55, height: 28 }]}
    /></Button>
    </XStack>

    <Image
    source={require('@/assets/images/sparking.png')} 
    style={[{ width: 173, height: 32 ,marginBottom:20}]}
    />
    </YStack>
    </Stack>
  )
}

export default Footer

const styles = StyleSheet.create({
    button:{
        height:44,
        width:343,
        backgroundColor:"#A9D05C",
        color:"#3A4D6C",
        fontFamily:"Montserrat",
        fontWeight:"700", 
        fontSize:16,
        lineHeight: 19.5, 
    },
    ouath:{
        height:52,
        width:95,
        backgroundColor:"#FFFFFF",
        fontWeight:"700", 
        fontSize:16,
        lineHeight: 19.5, 
    },
})