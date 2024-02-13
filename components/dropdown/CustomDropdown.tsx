import React, { useState } from 'react';
import { View, YStack } from 'tamagui';
import CustomInput from '../CustomInput';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';

import DropDownItem from './DropDownItem';
import { FlatList } from 'react-native';
import { option } from '@/types/options';
import Colors from '@/constants/Colors';

interface CustomDropDownProps {
  options: option[];
}

export default function CustomDropdown(props: CustomDropDownProps) {
  const { options } = props;
  const [clicked, setClicked] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setClicked(false);
  };

  return (
    <YStack>
      <CustomInput
        placeholder="Gender"
        value={selectedItem}
        inputStyle={{ textTransform: 'capitalize' }}
        readOnly
        icon={
          clicked ? (
            <ChevronUp color={Colors.secondary} />
          ) : (
            <ChevronDown color={Colors.secondary} />
          )
        }
        onPress={() => setClicked(!clicked)}
      />
      <YStack>
        {clicked && (
          <YStack
            position="absolute"
            marginTop={8}
            elevationAndroid={4}
            zIndex={1}
            backgroundColor={'white'}
            borderRadius={8}
            paddingVertical={14}
            paddingHorizontal={16}
            minWidth={'100%'}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              ItemSeparatorComponent={() => <View height={8} />}
              renderItem={({ item }) => (
                <DropDownItem
                  handleItemClick={handleItemClick}
                  selectedItem={selectedItem}
                  item={item}
                />
              )}
            />
          </YStack>
        )}
      </YStack>
    </YStack>
  );
}
