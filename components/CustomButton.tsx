import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Text } from 'tamagui';
import { ReactNode } from 'react';
import Colors from '@/constants/Colors';

interface CustomButtonProps {
  readonly title: string;
  readonly onPress: () => void;
  readonly buttonStyle?: StyleProp<ViewStyle>;
  readonly textStyle?: StyleProp<TextStyle>;
  readonly icon?: ReactNode;
}

export default function CustomButton(props: CustomButtonProps) {
  const { title, onPress, buttonStyle, textStyle, icon } = props;

  const defaultButtonStyle = StyleSheet.flatten([
    !buttonStyle && styles.button,
  ]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[defaultButtonStyle, buttonStyle]}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      {icon}
    </TouchableOpacity>
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

  buttonText: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
