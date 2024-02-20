import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Circle, YStack } from 'tamagui'
import { Image } from 'tamagui'

const TopScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Circle size={593} backgroundColor="white" elevation="$4" marginTop={-272} >
        <YStack marginBottom={30} marginTop={200} alignItems="center">
          <Image
            source={require('@/assets/images/acepointicon.png')}
            style={{ width: 320, height: 74 }}
          />
        </YStack>
      </Circle>
    </View>
  )
}

export default TopScreen

const styles = StyleSheet.create({})