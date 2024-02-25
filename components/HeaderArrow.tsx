import Colors from '@/constants/Colors'
import React from 'react'
import { Text,Button,XStack } from 'tamagui'
import { ChevronLeft } from '@tamagui/lucide-icons'

const HeaderArrow = ({data,gap,back}:{data:string,gap:string,back:any}) => {
    
  return (
    <XStack gap={gap} alignItems='center' backgroundColor={"#FFFF"} >
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