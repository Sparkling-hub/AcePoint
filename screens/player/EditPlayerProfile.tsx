import PlayerPfp from '@/components/PlayerPfp';
import Colors from '@/constants/Colors';

import { Button, Text, XStack, YStack } from 'tamagui';

import DatePicker from '@/components/DatePicker';
import { useState } from 'react';
import CustomInput from '@/components/CustomInput';
import CountryCodePicker from '@/components/CountryCodePicker';
import CustomDropdown from '@/components/dropdown/CustomDropdown';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StyleSheet } from 'react-native';
import { Info } from '@tamagui/lucide-icons';

const options = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

export default function EditPlayerProfile() {
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [countryCode, setCountryCode] = useState('+44');

  const [selectedItem, setSelectedItem] = useState(options[0].value);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name is too short!')
      .max(50, 'Name is too long!')
      .required('Name is required'),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email format'
      )
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Phone number must be only digits')
      .min(6, 'Phone number is too short!')
      .max(15, 'Phone number is too long!')
      .required('Phone number is required'),
  });

  const handleSubmit = (values: any) => {
    // Handle form submission
    console.log({ ...values, countryCode, gender: selectedItem, dateOfBirth });
  };

  return (
    <YStack flex={1}>
      <YStack marginBottom={30}>
        <YStack alignItems="center">
          <PlayerPfp imageContainerStyle={{ marginBottom: 20 }} />
          <Text
            style={{ fontFamily: 'Montserrat' }}
            fontSize={20}
            lineHeight={24}
            color={Colors.secondary}>
            Change profile picture
          </Text>
        </YStack>
      </YStack>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <YStack paddingHorizontal={20} gap={'$3'} minWidth={362} flex={1}>
            <YStack gap={'$3'}>
              <YStack>
                <CustomInput
                  placeholder="Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                {touched.name && errors.name && (
                  <XStack alignItems="center" marginTop={5} marginLeft={5}>
                    <Info size={18} color={'red'} marginRight={5} />
                    <Text style={styles.errorText}>{errors.name}</Text>
                  </XStack>
                )}
              </YStack>
              <YStack>
                <CustomInput
                  placeholder="Email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                {touched.email && errors.email && (
                  <XStack alignItems="center" marginTop={5} marginLeft={5}>
                    <Info size={18} color={'red'} marginRight={5} />
                    <Text style={styles.errorText}>{errors.email}</Text>
                  </XStack>
                )}
              </YStack>
            </YStack>
            <XStack gap={'$3'}>
              <YStack flex={1}>
                <CountryCodePicker
                  countryCode={countryCode}
                  setCountryCode={setCountryCode}
                />
              </YStack>
              <YStack flex={2}>
                <YStack>
                  <CustomInput
                    placeholder="Phone"
                    keyboardType="numeric"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                  />
                  {touched.phone && errors.phone && (
                    <XStack alignItems="center" marginTop={5} marginLeft={5}>
                      <Info size={18} color={'red'} marginRight={5} />
                      <Text style={styles.errorText}>{errors.phone}</Text>
                    </XStack>
                  )}
                </YStack>
              </YStack>
            </XStack>
            <YStack gap={'$3'}>
              <CustomDropdown
                options={options}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
              <DatePicker date={dateOfBirth} setDate={setDateOfBirth} />
            </YStack>
            {/* <Button onPress={() => handleSubmit()}>Save</Button> */}
          </YStack>
        )}
      </Formik>
    </YStack>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'MontserratMedium',
  },
});
