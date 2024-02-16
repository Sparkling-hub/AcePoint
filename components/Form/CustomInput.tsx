import Colors from '@/constants/Colors';
import { Info } from '@tamagui/lucide-icons';

import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Input, InputProps, Text, XStack, YStack } from 'tamagui';

interface CustomInputProps extends InputProps {
  onPress?: () => void;
  icon?: React.ReactNode;
  readOnly?: boolean;
  inputStyle?: object;
  touched?: boolean;
  errors?: string;
  validateOnInit?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const {
    placeholder,
    onPress,
    inputStyle,
    readOnly,
    icon,
    value,
    touched,
    errors,
    validateOnInit,
    ...rest
  } = props;
  const textInputRef = useRef<Input>(null);

  const handleContainerPress = () => {
    if (onPress) {
      onPress();
    }
    if (!readOnly && textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  return (
    <YStack>
      <TouchableOpacity onPress={handleContainerPress} activeOpacity={0.5}>
        <YStack
          height={70}
          backgroundColor={
            (touched && errors) || (validateOnInit && errors)
              ? '#FEECEB'
              : Colors.iron
          }
          borderRadius={8}
          paddingVertical={16}
          paddingHorizontal={32}
          justifyContent="center"
          alignItems="center">
          <XStack alignItems="center" justifyContent="space-between">
            <YStack>
              {placeholder && (
                <Text
                  style={{ fontFamily: 'MontserratMedium' }}
                  color={Colors.secondary}
                  fontSize={14}
                  lineHeight={17}>
                  {placeholder}
                </Text>
              )}
              <Input
                ref={textInputRef}
                color={Colors.secondary}
                fontSize={16}
                lineHeight={20}
                minWidth={'100%'}
                style={[{ fontFamily: 'MontserratMedium' }, inputStyle]}
                editable={!readOnly}
                value={value}
                unstyled
                {...rest}
              />
            </YStack>
            {icon}
          </XStack>
        </YStack>
      </TouchableOpacity>
      {(touched && errors) || (validateOnInit && errors) ? (
        <XStack alignItems="center" marginTop={5} marginLeft={5}>
          <Info size={18} color={'red'} marginRight={5} />
          <Text
            style={{ fontFamily: 'MontserratMedium' }}
            color={'red'}
            fontSize={12}>
            {errors}
          </Text>
        </XStack>
      ) : null}
    </YStack>
  );
};

export default CustomInput;
