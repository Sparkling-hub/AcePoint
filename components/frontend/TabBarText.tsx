import React from 'react';
import { Text } from 'tamagui';
import Colors from '@/constants/Colors';

interface TabBarTextProps {
  focused: boolean;
  text: string;
}

const TabBarText: React.FC<TabBarTextProps> = ({ focused, text }) => {
  return (
    <Text
      style={{
        ...styles.tabBarLabelStyle,
        color: focused ? Colors.secondary : Colors.primary,
      }}>
      {text}
    </Text>
  );
};

const styles = {
  tabBarLabelStyle: {
    fontFamily: 'MontserratBold',
    fontSize: 10,
    lineHeight: 10,
    paddingTop: 22,
  },
};

export default TabBarText;
