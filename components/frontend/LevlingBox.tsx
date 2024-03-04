import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { Stack, XStack, YStack } from 'tamagui'
import { Info } from '@tamagui/lucide-icons';

const LevlingBox = () => {
  return (
    <Stack space="$5" alignItems="center" style={[styles.stack, styles.box]}>
      <XStack alignItems="flex-start">
        <Info size={24} color={'#3A4D6C'} />
        <YStack>
          <Text style={[styles.text, { maxWidth: '90%' }]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo ex,
            dapibus sit amet nisi ut, posuere laoreet nulla. Suspendisse dignissim elit in justo efficitur.
          </Text>
        </YStack>
      </XStack>
    </Stack>


  )
}

export default LevlingBox

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    height: 83,
    width: '90%',
    backgroundColor: "#d8dbe2",
  },
  text: {
    color: "#3d5581",
    fontSize: 12,
    lineHeight: 14.63,
    fontFamily: "Montserrat",
    fontWeight: "400",
    textAlign: 'left',
    marginLeft: 20,
  },
  stack: {
    marginBottom: 10
  },
})