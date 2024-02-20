import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, YStack } from 'tamagui'



const Botton = ({ textColor, text, onPress }: { textColor?: string, text: string, onPress?: () => void }) => {
  return (
    <YStack gap={'$3'} style={{ alignItems: 'center' }}>
      <Button style={styles.button} onPress={onPress}>{text}</Button>
    </YStack>
  )
}

export default Botton

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    height: 52,
    width: 204,
    backgroundColor: "#3A4D6C",
  },
})