import React from 'react';

import Colors from '@/constants/Colors';
import { Text } from 'tamagui';

interface HeaderTextProps {
  text: string;
}

const HeaderText: React.FC<HeaderTextProps> = ({ text }) => {
  return (
    <Text
      style={{ fontFamily: 'MontserratBold' }}
      fontSize={18}
      lineHeight={22}
      textTransform="uppercase"
      color={Colors.secondary}>
      {text}
    </Text>
  );
};

export default HeaderText;
