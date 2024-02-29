import Colors from '@/constants/Colors';
import React from 'react';
import { Text, TextProps } from 'tamagui';

interface FilterTextProps extends TextProps {
  title: string;
  sliderValue?: number[];

  unit?: string;
}

const FilterText: React.FC<FilterTextProps> = ({
  title,
  sliderValue,
  unit,
  ...porps
}) => {
  return (
    <Text
      style={{ fontFamily: 'MontserratBold' }}
      color={Colors.secondary}
      fontSize={16}
      lineHeight={19}
      {...porps}>
      {title}
      <Text color={Colors.primary} style={{ fontFamily: 'MontserratBold' }}>
        {sliderValue?.[0] ?? ''}
        {unit}
      </Text>
    </Text>
  );
};

export default FilterText;
