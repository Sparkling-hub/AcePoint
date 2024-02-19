import { Check as CheckIcon } from '@tamagui/lucide-icons'
import type { CheckboxProps, SizeTokens } from 'tamagui'
import { Checkbox, Label, XStack } from 'tamagui'
export function CheckboxWithLabel({
    size,
    label ,

    ...checkboxProps
  }: CheckboxProps & { size: SizeTokens; label?: string }) {
    const id = `checkbox-${size.toString().slice(1)}`
    return (
      <XStack width={300} alignItems="center" space="$4">
        <Checkbox id={id} size={size} {...checkboxProps}  style={{backgroundColor:"#D9D9D9", borderColor:"#3A4D6C",borderWidth:1,borderRadius:0 }}>
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox>
  
        <Label size={size} style={{color:"#000000",fontSize:12,fontFamily:"Montserrat",fontWeight:"500",lineHeight: 14.63,}} htmlFor={id}>
          {label}
        </Label>
      </XStack>
    )
  }