import React, { useState } from 'react';

import { CountryPicker } from 'react-native-country-codes-picker';

import CustomInput from './CustomInput';
import { ChevronDown } from '@tamagui/lucide-icons';
import Colors from '@/constants/Colors';
import { YStack } from 'tamagui';

interface CountryCodePickerProps {
  countryCode: string;
  setCountryCode: (code: string) => void;
}

export default function CountryCodePicker(props: CountryCodePickerProps) {
  const { countryCode, setCountryCode } = props;
  const [show, setShow] = useState(false);

  const showCountryPicker = () => {
    setShow(true);
  };

  return (
    <YStack>
      <CustomInput
        onPress={showCountryPicker}
        readOnly
        value={countryCode}
        icon={<ChevronDown color={Colors.secondary} />}
      />
      <CountryPicker
        show={show}
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
        lang="en"
        style={{ modal: { height: 500 } }}
        disableBackdrop={true}
      />
    </YStack>
  );
}
