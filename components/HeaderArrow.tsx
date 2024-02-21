import Colors from '@/constants/Colors'
import React from 'react'
import { Text } from 'tamagui'
import { XStack } from 'tamagui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { Button } from 'tamagui'
import { router } from 'expo-router'

const HeaderArrow = ({data,gap}:{data:string,gap:string}) => {
    const back=()=>{
        router.back()
    }
  return (
    <XStack gap={gap} alignItems='center' >
        <Button bg="transparent" icon={<ChevronLeft bg="transparent" color={Colors.secondary} size={25}   />} onPress={back}></Button>
        <Text
         style={{ fontFamily: 'MontserratBold' }}
        fontSize={20}
        lineHeight={24}
        color={Colors.secondary}>
         {data}
        </Text>
    </XStack>
  )
}

export default HeaderArrow