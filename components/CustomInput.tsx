import Colors from '@/constants/Colors';
import React, { useRef } from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Text, View } from 'tamagui';

interface CustomInputProps extends TextInputProps {
  onPress?: () => void;
  icon?: React.ReactNode;
  readOnly?: boolean;
  inputStyle?: object;
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const { placeholder, onPress, inputStyle, readOnly, icon, ...rest } = props;
  const textInputRef = useRef<TextInput>(null);

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
      <View style={styles.inputContainer}>
        <View
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row">
          <View>
            {placeholder && (
              <Text style={styles.placeholder} fontSize={14} lineHeight={17}>
                {placeholder}
              </Text>
            )}
            <TextInput
              ref={textInputRef}
              style={[styles.textInput, inputStyle]}
              editable={!readOnly}
              {...rest}
            />
          </View>
          {icon && icon}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 70,
    backgroundColor: '#DADADA',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    fontFamily: 'MontserratMedium',
    color: Colors.secondary,
  },
  textInput: {
    fontFamily: 'MontserratMedium',
    color: Colors.secondary,
    fontSize: 16,
    lineHeight: 20,
    minWidth: '100%',
  },
});

export default CustomInput;
