import Colors from '@/constants/Colors';
import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { Input, InputProps, Text, XStack, YStack } from 'tamagui';

interface CustomInputProps extends InputProps {
  onPress?: () => void;
  icon?: React.ReactNode;
  readOnly?: boolean;
  inputStyle?: object;
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const { placeholder, onPress, inputStyle, readOnly, icon, ...rest } = props;
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
    <TouchableOpacity onPress={handleContainerPress} activeOpacity={0.5}>
      <YStack
        height={70}
        backgroundColor={'#DADADA'}
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
              unstyled
              {...rest}
            />
          </YStack>
          {icon}
        </XStack>
      </YStack>
    </TouchableOpacity>
  );
};

export default CustomInput;
