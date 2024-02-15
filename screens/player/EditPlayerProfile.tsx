import PlayerPfp from '@/components/PlayerPfp';
import Colors from '@/constants/Colors';

import { Button, Text, XStack, YStack } from 'tamagui';

import DatePicker from '@/components/DatePicker';
import { useEffect, useState } from 'react';
import CustomInput from '@/components/CustomInput';
import CountryCodePicker from '@/components/CountryCodePicker';
import CustomDropdown from '@/components/dropdown/CustomDropdown';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { Platform, StyleSheet } from 'react-native';
import { Info } from '@tamagui/lucide-icons';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


export default function EditPlayerProfile() {
  const date = new Date(1900, 1, 1)
  const [dateOfBirth, setDateOfBirth] = useState<Date>(date);
  const [countryCode, setCountryCode] = useState('+44');

  const [selectedItem, setSelectedItem] = useState('');
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const initialValues = {
    name: '',
    email: '',
    phone: '',
  }
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
  const {
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  const options = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const getUserData = async () => {
    try {
      const u = await ReactNativeAsyncStorage.getItem('username')
      if (u) {
        setUsername(u)
        values.name = u
      }
      const e = await ReactNativeAsyncStorage.getItem('email')
      if (e) {
        setEmail(e)
        values.email = e
      }
      const ph = await ReactNativeAsyncStorage.getItem('phoneNumber')
      if (ph) {
        setPhone(ph)
        values.phone = ph
      }
      const g = await ReactNativeAsyncStorage.getItem('gender')
      if (g) setSelectedItem(g)
      const b = await ReactNativeAsyncStorage.getItem('birthday')
      if (b) setDateOfBirth(new Date(b))
    } catch (error) {
      console.log(error);
    }
  }
  const [conditionDate, setConditionDate] = useState(false)
  useEffect(()=>{
    setConditionDate(false)
  }, [dateOfBirth])
  useEffect(() => {
    getUserData()
    setConditionDate(date == dateOfBirth)
  }, [])

  return (
    <YStack flex={1} paddingTop={Platform.OS === 'ios' ? 90 : 30}>
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
        {() => (
          <YStack paddingHorizontal={20} gap={'$3'} minWidth={362} flex={1}>
            <YStack gap={'$3'}>
              <YStack>
                <CustomInput
                  placeholder="Name"
                  value={username}
                  onChangeText={(e) => {
                    handleChange('name')
                    setUsername(e)
                    values.name = e
                  }}
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
                  value={email}
                  onChangeText={(e) => {
                    handleChange('email')
                    setEmail(e)
                    values.email = e
                  }}
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
                    value={phone}
                    onChangeText={(e) => {
                      handleChange('phone')
                      setPhone(e)
                      values.phone = e
                    }}
                    onBlur={handleBlur('phone')}
                  />
                  {touched.phone && errors.phone && (
                    <XStack alignItems="center" marginTop={5} marginLeft={5}>
                      <Info size={18} color={'red'} marginRight={5} />
                      <Text style={styles.errorText}>{errors.phone}</Text>
                    </XStack>
                  )}
                  {phone === "" && (
                    <XStack alignItems="center" marginTop={5} marginLeft={5}>
                      <Info size={18} color={'red'} marginRight={5} />
                      <Text style={styles.errorText}>Please type your phone number !</Text>
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
              {selectedItem === '' && (
                <XStack alignItems="center" marginTop={5} marginLeft={5}>
                  <Info size={18} color={'red'} marginRight={5} />
                  <Text style={styles.errorText}>Please select a gender !</Text>
                </XStack>
              )}
              <DatePicker date={dateOfBirth} setDate={setDateOfBirth} />
              {conditionDate &&
                <XStack alignItems="center" marginTop={5} marginLeft={5}>
                  <Info size={18} color={'red'} marginRight={5} />
                  <Text style={styles.errorText}>Please select your birthday !</Text>
                </XStack>
              }
            </YStack>
            <Button onPress={() => handleSubmit(values)}>Save</Button>
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
