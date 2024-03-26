import Colors from '@/constants/Colors';
import { option } from '@/types/options';
import { Check } from '@tamagui/lucide-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, XStack } from 'tamagui';

interface DropDownItemProps {
  readonly handleItemClick: (item: string) => void;
  readonly selectedItem: string;
  readonly item: option;
  readonly testID?: string
}

export default function DropDownItem(props: DropDownItemProps) {
  const { handleItemClick, selectedItem, item, testID } = props;
  return (
    <TouchableOpacity
      testID={testID}
      onPress={() => handleItemClick(item.value)}
      style={{
        paddingVertical: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 10,
      }}>
      <XStack alignItems="center" justifyContent="space-between">
        <Text
          fontSize={14}
          lineHeight={20}
          marginRight={10}
          textTransform="capitalize"
          style={{
            fontFamily: 'MontserratMedium',
            color: Colors.secondary,
          }}>
          {item.label}
        </Text>
        {selectedItem === item.value && (
          <Check color={Colors.secondary} size={'$1'} />
        )}
      </XStack>
    </TouchableOpacity>
  );
}
