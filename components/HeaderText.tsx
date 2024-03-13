import React from 'react';
import { Text } from 'tamagui';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';

import Colors from '@/constants/Colors';

interface HeaderTextProps {
  text: string;
  headerTextStyle?: StyleProp<TextStyle>;
}

const HeaderText: React.FC<HeaderTextProps> = ({ text, headerTextStyle }) => {
  return <Text style={[styles.text, headerTextStyle]}>{text}</Text>;
};

export default HeaderText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'MontserratBold',
    fontSize: 18,
    lineHeight: 22,
    color: Colors.secondary,
  },
});
