import Colors from '@/constants/Colors';
import React from 'react';
import { Text, XStack } from 'tamagui';
import Close from '../svg/Close';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface FilterItemProps {
  title: string;
  leftIcon?: React.ReactNode;
  onPress?: () => void;
}

const FilterItem: React.FC<FilterItemProps> = ({
  title,
  leftIcon,
  onPress,
}) => {
  const { filterIsLoading } = useSelector(
    (state: RootState) => state.filterIsLoading
  );
  return (
    <XStack
      alignItems="center"
      gap={4}
      paddingHorizontal={8}
      paddingVertical={4}
      height={28}
      backgroundColor={Colors.secondary}
      borderRadius={8}>
      {leftIcon}
      <Text
        style={{ fontFamily: 'MontserratSemiBold' }}
        color={'white'}
        fontSize={16}
        lineHeight={19}>
        {title}
      </Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        disabled={filterIsLoading}>
        <Close />
      </TouchableOpacity>
    </XStack>
  );
};

export default FilterItem;
