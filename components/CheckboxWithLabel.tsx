import { Check as CheckIcon } from '@tamagui/lucide-icons'
import { StyleSheet } from 'react-native';
import type { CheckboxProps, SizeTokens } from 'tamagui'
import { Checkbox, Label, XStack,YStack,Text } from 'tamagui'
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

interface CheckboxWithLabel extends Readonly<CheckboxProps>   {
  size: SizeTokens;
  label?: string;
  onPress: () => void;
  terms?: boolean;
}
export function CheckboxWithLabel ({
  size,
  label,
  onPress,
  terms = true, 
  ...checkboxProps
  }: CheckboxWithLabel ) {

    const id = `checkbox-${size.toString().slice(1)}`
    return (
      <XStack width={300} style={{marginLeft:20}} >
        
        <YStack gap={'$3'}>
        <XStack gap={'$3'}>
          <Checkbox id={id} size={size} {...checkboxProps} onPress={onPress} style={{backgroundColor:"#D9D9D9", borderColor:"#3A4D6C",borderWidth:1,borderRadius:0 }}>
            <Checkbox.Indicator>   
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox>
          <XStack>
          <Label size={size} style={{color:"#000000",fontSize:12,fontFamily:"Montserrat",fontWeight:"500",lineHeight: 14.63,}} htmlFor={id}>
          {label}
          </Label></XStack>
        </XStack>
          <Text color={"#000000"} style={[styles.text]} >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo ex, 
              dapibus sit amet nisi ut, posuere laoreet nulla. Suspendisse dignissim elit in justo efficitur.
          </Text>
        </YStack>
      </XStack>
    )
  }
  const styles = StyleSheet.create({
    text:{
        fontSize:10,
        fontWeight:"400",
        fontFamily:"Montserrat",
        lineHeight:12.19,
        marginLeft:hp("4%")
      },
})
