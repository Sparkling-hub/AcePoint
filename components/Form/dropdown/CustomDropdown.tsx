import React, { useState } from 'react';
import { YStack } from 'tamagui';
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
}

export default function CustomDropdown(props: CustomDropDownProps) {
  const {
    options,
    selectedItem,
    handleChange,
    touched,
    errors,
    validateOnInit,
  } = props;
  const [clicked, setClicked] = useState(false);

  const handleItemClick = (item: string) => {
    handleChange(item);
    setClicked(false);
  };

  return (
    <YStack zIndex={1}>
      <CustomInput
        placeholder="Gender"
        touched={touched}
        errors={errors}
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
        onPress={() => setClicked(!clicked)}
      />
      <YStack>
        {clicked && (
          <YStack
            position="absolute"
            marginTop={8}
            elevationAndroid={4}
            $platform-ios={{
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 4,
            }}
            backgroundColor={'white'}
            borderRadius={8}
            paddingVertical={10}
            paddingHorizontal={16}
            minWidth={'100%'}>
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
