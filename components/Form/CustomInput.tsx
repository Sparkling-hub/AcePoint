import Colors from '@/constants/Colors';

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
  hide?: boolean;
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
    hide,
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
    <YStack width={props.width}>
      <TouchableOpacity onPress={handleContainerPress} activeOpacity={0.5}>
        <YStack
          height={70}
          backgroundColor={Colors.iron}
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
                  {errors && <Text color={'red'}> *</Text>}
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
                secureTextEntry={hide}
                unstyled
                {...rest}
              />
            </YStack>
            {icon}
          </XStack>
        </YStack>
      </TouchableOpacity>
    </YStack>
  );
};

export default CustomInput;
