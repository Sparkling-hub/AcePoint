import React, { useState } from 'react';
import { View } from 'tamagui';
import CustomInput from '../CustomInput';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';

import DropDownItem from './DropDownItem';
import { FlatList } from 'react-native';
import { option } from '@/types/options';

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
    <View>
      <CustomInput
        placeholder="Gender"
        value={selectedItem}
        inputStyle={{ textTransform: 'capitalize' }}
        readOnly
        icon={
          clicked ? (
            <ChevronUp color={'#3A4D6C'} />
          ) : (
            <ChevronDown color={'#3A4D6C'} />
          )
        }
        onPress={() => setClicked(!clicked)}
      />
      <View>
        {clicked && (
          <View
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
          </View>
        )}
      </View>
    </View>
  );
}
