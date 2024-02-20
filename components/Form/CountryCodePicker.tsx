import React, { useState } from 'react';
import { CountryPicker } from 'react-native-country-codes-picker';
import CustomInput from './CustomInput';
import { ChevronDown } from '@tamagui/lucide-icons';
import Colors from '@/constants/Colors';
import { YStack } from 'tamagui';
import { FormikHandlers } from 'formik';

interface CountryCodePickerProps {
  countryCode: string;
  handleChange: FormikHandlers['handleChange'];
  touched?: boolean;
  errors?: string;
  validateOnInit?: boolean;
}

export default function CountryCodePicker(props: Readonly<CountryCodePickerProps>) {
  const { countryCode, handleChange, touched, errors, validateOnInit } = props;
  const [show, setShow] = useState(false);

  const showCountryPicker = () => {
    setShow(!show);
  };

  return (
    <YStack>
      <CustomInput
        onPress={showCountryPicker}
        touched={touched}
        errors={errors}
        validateOnInit={validateOnInit}
        readOnly
        style={{zIndex:10}}
        value={countryCode}
        icon={<ChevronDown color={Colors.secondary} />}
      />
      <CountryPicker
        show={show}
        pickerButtonOnPress={(item) => {
          handleChange(item.dial_code);
          setShow(false);
        }}
        lang="en"
        style={{ modal: { height: 500 } }}
        disableBackdrop={true}
      />
    </YStack>
  );
}