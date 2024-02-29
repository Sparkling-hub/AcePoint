import Colors from '@/constants/Colors';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Text, View } from 'tamagui';

interface FilterHeaderProps {
  title: string;
  containerStyles?: StyleProp<ViewStyle>;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({
  title,
  containerStyles,
}) => {
  return (
    <View
      height={30}
      backgroundColor={Colors.secondary}
      borderRadius={8}
      paddingLeft={13}
      paddingVertical={3}
      style={containerStyles}>
      <Text
        style={{ fontFamily: 'MontserratBold' }}
        color={'white'}
        fontSize={20}
        lineHeight={24}>
        {title}
      </Text>
    </View>
  );
};

export default FilterHeader;
