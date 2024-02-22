import React, { useState } from 'react';
import { ScrollView, YStack } from 'tamagui';
import CustomInput from '../CustomInput';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';

import DropDownItem from './DropDownItem';

import { option } from '@/types/options';
import Colors from '@/constants/Colors';
import { FormikHandlers } from 'formik';

interface CustomDropDownProps {
  readonly options: option[];
  readonly selectedItem: string;
  readonly handleChange: FormikHandlers['handleChange'];
  readonly touched?: boolean;
  readonly errors?: string;
  readonly validateOnInit?: boolean;
  readonly scrollViewRef?: React.RefObject<ScrollView>;
}

export default function CustomDropdown(props: CustomDropDownProps) {
  const {
    options,
    selectedItem,
    handleChange,
    touched,
    errors,
    validateOnInit,
    scrollViewRef,
  } = props;
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    scrollViewRef &&
      scrollViewRef.current?.scrollTo({ y: 100, animated: true });
  };

  const handleItemClick = (item: string) => {
    handleChange(item);
    setClicked(false);
  };

  return (
    <YStack zIndex={1}>
      <CustomInput
        placeholder="Gender"
        touched={!clicked && touched}
        errors={!clicked ? errors : ''}
        validateOnInit={validateOnInit}
        value={selectedItem}
        textTransform="capitalize"
        readOnly
        icon={
          clicked ? (
            <ChevronUp color={Colors.secondary} />
          ) : (
            <ChevronDown color={Colors.secondary} />
          )
        }
        onPress={handleClick}
      />
      <YStack marginTop={8} paddingHorizontal={5}>
        {clicked && (
          <YStack
            maxHeight={300}
            width={'100%'}
            elevation={4}
            $platform-ios={{
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 4,
            }}
            backgroundColor={'white'}
            borderRadius={8}
            paddingVertical={10}
            paddingHorizontal={16}>
            {options.map((option) => (
              <DropDownItem
                key={option.value}
                handleItemClick={handleItemClick}
                selectedItem={selectedItem}
                item={option}
              />
            ))}
          </YStack>
        )}
      </YStack>
    </YStack>
  );
}
