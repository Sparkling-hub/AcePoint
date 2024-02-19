import Colors from '@/constants/Colors';

import { ScrollView, Text, XStack, YStack } from 'tamagui';

import { useEffect, useState } from 'react';

import CountryCodePicker from '@/components/Form/CountryCodePicker';
import { FormikValues, useFormik } from 'formik';
import * as Yup from 'yup';
import { ActivityIndicator, Platform } from 'react-native';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import CustomInput from '@/components/Form/CustomInput';
import { Search } from '@tamagui/lucide-icons';

const options = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

export default function View() {
  const [isLoading, setIsLoading] = useState(true);
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    countryCode: '+44',
    dateOfBirth: '',
    club: '',
  };

  const playerValidationSchema = Yup.object().shape({
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
      .matches(/^[0-9]+$/, 'Phone must be only digits')
      .min(6, 'Phone number is too short!')
      .max(15, 'Phone number is too long!')
      .required('Please enter your phone number'),
    gender: Yup.string().required('Please select your gender'),
    dateOfBirth: Yup.string().required('Please enter your date of birth'),
    countryCode: Yup.string().required('Country code is required'),
  });

  const coachValidationSchema = playerValidationSchema.shape({
    club: Yup.string().required('Please enter your club'),
  });



  const handleSubmit = (values: FormikValues) => {
    // Handle form submission
    console.log({ ...values });
  };

  const formik = useFormik({
    validateOnMount: true,
    initialValues,
    onSubmit: (values) => handleSubmit(values),
  });

  const getUserData = async () => {
    try {
      const u = await ReactNativeAsyncStorage.getItem('username');
      const e = await ReactNativeAsyncStorage.getItem('email');
      const ph = await ReactNativeAsyncStorage.getItem('phoneNumber');
      const g = await ReactNativeAsyncStorage.getItem('gender');
      const b = await ReactNativeAsyncStorage.getItem('birthday');
      const c = await ReactNativeAsyncStorage.getItem('club');

      formik.setValues({
        ...formik.values,
        name: u || formik.values.name,
        email: e || formik.values.email,
        phone: ph || formik.values.phone,
        gender: g || formik.values.gender,
        dateOfBirth: b || formik.values.dateOfBirth,
        club: c || formik.values.club,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color={Colors.primary} />
      </YStack>
    );
  }

  return (
    <YStack flex={1} paddingTop={Platform.OS === 'ios' ? 90 : 20}>
      <ScrollView marginBottom={20}>
        <YStack marginBottom={30}>
          <YStack alignItems="center">
          
            <Text
              style={{ fontFamily: 'Montserrat' }}
              fontSize={20}
              lineHeight={24}
              color={Colors.secondary}>
              Change profile picture
            </Text>
          </YStack>
        </YStack>

        <YStack paddingHorizontal={20} gap={'$3'} minWidth={362} flex={1}>
          <YStack gap={'$3'}>
            <YStack>
              <CustomInput
                placeholder="Name"
                value={formik.values.name}
                onChangeText={formik.handleChange('name')}
                onBlur={formik.handleBlur('name')}
                errors={formik.errors.name}
                validateOnInit
              />
            </YStack>
            <YStack>
              <CustomInput
                placeholder="Email"
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                errors={formik.errors.email}
                validateOnInit
              />
            </YStack>
          </YStack>
          <XStack gap={'$3'}>
            <YStack flex={1}>
              <CountryCodePicker
                countryCode={formik.values.countryCode}
                handleChange={formik.handleChange('countryCode')}
                errors={formik.errors.countryCode}
                validateOnInit
              />
            </YStack>
            <YStack flex={2}>
              <YStack>
                <CustomInput
                  placeholder="Phone"
                  keyboardType="numeric"
                  value={formik.values.phone}
                  onChangeText={formik.handleChange('phone')}
                  onBlur={formik.handleBlur('phone')}
                  errors={formik.errors.phone}
                  validateOnInit
                />
              </YStack>
            </YStack>
          </XStack>
          <YStack gap={'$3'}>
          
          </YStack>
          {/* <Button onPress={() => formik.handleSubmit()}>Save</Button> */}
        </YStack>
      </ScrollView>
    </YStack>
  );
}