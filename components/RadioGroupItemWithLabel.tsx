import { StyleSheet } from 'react-native'
import type { SizeTokens } from 'tamagui'
import { Label, RadioGroup, Text, XStack,YStack } from 'tamagui'
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export function RadioGroupItemWithLabel(props: Readonly<{
  size: SizeTokens;
  value: string;
  label: string;
  level?:string;
  text?:string
}>) {
    const id = `radiogroup-${props.value}`
    return (
      <XStack width={300} alignItems="center" space="$3">
        <YStack gap={'$3'}>
        <XStack gap={'$3'}>
        <RadioGroup.Item value={props.value} id={id} size={props.size} style={{backgroundColor:"#D9D9D9"}}>
          <RadioGroup.Indicator style={{backgroundColor:"#3A4D6C" ,height:8,width:8}} />
        </RadioGroup.Item>
        <Label size={props.size} htmlFor={id} style={styles.label}>
          {props.label}
        </Label>
        </XStack>
        {props.level===props.label&& <Text color={"#3A4D6C"} style={styles.showtext}>{props.text}</Text>}
        </YStack>
      </XStack>
    )
  }
  const styles = StyleSheet.create({
      label:{
        fontFamily:"Montserrat",
        fontSize:14,
        fontWeight:"500",
        color:"#3A4D6C",
        lineHeight: 17.07,
      },
      showtext:{
        fontSize:12,
        lineHeight: 14.63,
        fontFamily:"Montserrat",
        fontWeight:"400",
        textAlign: 'left',
        marginTop:0,
        marginLeft:hp("4%")
      }   
})