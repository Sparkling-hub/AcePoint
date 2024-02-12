import Colors from '@/constants/Colors';
import { option } from '@/types/options';
import { Check } from '@tamagui/lucide-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'tamagui';

interface DropDownItemProps {
  handleItemClick: (item: string) => void;
  selectedItem: string;
  item: option;
}

export default function DropDownItem(props: DropDownItemProps) {
  const { handleItemClick, selectedItem, item } = props;
  return (
    <TouchableOpacity
      onPress={() => handleItemClick(item.value)}
      style={{
        paddingVertical: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        width: '100%',
        paddingHorizontal: 20,
      }}>
      <View
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Text
          style={{
            fontFamily: 'MontserratMedium',
            color: Colors.secondary,
            fontSize: 14,
            lineHeight: 20,
            marginRight: 10,
            textTransform: 'capitalize',
          }}>
          {item.label}
        </Text>
        {selectedItem === item.value && <Check color={'#3A4D6C'} size={'$1'} />}
      </View>
    </TouchableOpacity>
  );
}
