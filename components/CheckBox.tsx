import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { CheckboxProps, YStack } from 'tamagui'
import { CheckboxWithLabel } from './CheckboxWithLabel'
import { Text } from 'tamagui'


interface CheckBoxProps extends CheckboxProps {
    onPress?: () => void;
    icon?: React.ReactNode;
    readOnly?: boolean;
    inputStyle?: object;
    touched?: boolean;
    errors?: string;
    validateOnInit?: boolean;
  }
  
  const CustomInput: React.FC<CheckBoxProps> = (props) => {
    const {
      onPress,
      inputStyle,
      value,
      errors,
      validateOnInit,
      ...rest
    } = props;
  
    const handleContainerPress = () => {
      if (onPress) {
        onPress();
      }
    };
  
    return (
      <YStack>
        <TouchableOpacity onPress={handleContainerPress} activeOpacity={0.5}>
        <CheckboxWithLabel size="$3" label='Marketing Comunication from Acepoint' onPress={onCheckedChangeMarketing} />
            <Text color={"#000000"} style={[styles.text,inputStyle]} >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo ex, 
            dapibus sit amet nisi ut, posuere laoreet nulla. Suspendisse dignissim elit in justo efficitur.
                </Text>
        </TouchableOpacity>
      </YStack>
    );
  };
  
  export default CustomInput;

const styles = StyleSheet.create({
    text:{
        fontSize:10,
        fontWeight:"400",
        fontFamily:"Montserrat",
        lineHeight: 12.19,
        // marginLeft:hp("4.5%")
      },
})