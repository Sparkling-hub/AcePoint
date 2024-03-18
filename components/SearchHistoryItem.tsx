import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Text, XStack } from 'tamagui';
import Colors from '@/constants/Colors';
import { X } from '@tamagui/lucide-icons';

interface SearchHistoryItemProps {
  item: string;
  handlePressSearchItem: (item: string) => void;
  removeSearchHistoryItem: (item: string) => void;
}

const SearchHistoryItem: React.FC<SearchHistoryItemProps> = ({
  item,
  handlePressSearchItem,
  removeSearchHistoryItem,
}) => {
  return (
    <XStack justifyContent="space-between">
      <TouchableOpacity onPress={() => handlePressSearchItem(item)}>
        <Text
          style={{ fontFamily: 'MontserratBold' }}
          fontSize={16}
          lineHeight={19}
          color={Colors.secondary}>
          {item}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeSearchHistoryItem(item)}>
        <X size={20} color={Colors.secondary} />
      </TouchableOpacity>
    </XStack>
  );
};

export default SearchHistoryItem;
