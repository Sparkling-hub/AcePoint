import { Pressable, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Text } from 'tamagui';
import { ReactNode } from 'react';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
}

export default function CustomButton(props: CustomButtonProps) {
  const { title, onPress, buttonStyle, textStyle, icon } = props;

  return (
    <Pressable onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{title}</Text>
      {icon && icon}
    </Pressable>
  );
}
