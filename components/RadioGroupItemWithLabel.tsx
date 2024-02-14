import { StyleSheet } from 'react-native'
import type { SizeTokens } from 'tamagui'
import { Label, RadioGroup, XStack } from 'tamagui'

export function RadioGroupItemWithLabel(props: Readonly<{
  size: SizeTokens;
  value: string;
  label: string;
}>) {
    const id = `radiogroup-${props.value}`
    return (
      <XStack width={300} alignItems="center" space="$3">
        <RadioGroup.Item value={props.value} id={id} size={props.size} style={{backgroundColor:"#D9D9D9"}}>
          <RadioGroup.Indicator style={{backgroundColor:"#3A4D6C" ,height:8,width:8}} />
        </RadioGroup.Item>
  
        <Label size={props.size} htmlFor={id} style={styles.label}>
          {props.label}
        </Label>
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
     
})