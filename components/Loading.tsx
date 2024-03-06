import { Spinner, YStack } from 'tamagui'
import React from 'react'

const Loading = () => {
  return (
    <YStack padding="$3" gap="$4" alignItems="center">
      <Spinner size="large" color="$green10" />
    </YStack>
  )
}

export default Loading

