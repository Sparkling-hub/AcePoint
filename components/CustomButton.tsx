import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Button, Text } from 'tamagui';
import { ReactNode, useState } from 'react';
import Colors from '@/constants/Colors';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
}

export default function CustomButton(props: CustomButtonProps) {
  const { title, onPress, buttonStyle, textStyle, icon } = props;
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Button
      unstyled
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[
        buttonStyle ? buttonStyle : styles.button,
        isPressed && styles.buttonPressed,
      ]}>
      <Text style={textStyle ? textStyle : styles.buttonText}>{title}</Text>
      {icon && icon}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginVertical: 12,
    backgroundColor: Colors.secondary,
    borderRadius: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
