import Colors from '@/constants/Colors';

import { ScrollView, Text, XStack, YStack } from 'tamagui';

import DatePicker from '@/components/Form/DatePicker';
import { useEffect, useState } from 'react';

import CountryCodePicker from '@/components/Form/CountryCodePicker';
import CustomDropdown from '@/components/Form/dropdown/CustomDropdown';
import { FormikValues, useFormik } from 'formik';
import * as Yup from 'yup';
import { ActivityIndicator, Platform } from 'react-native';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import PorfilePicture from '@/components/PorfilePicture';
import CustomInput from '@/components/Form/CustomInput';
import { Search } from '@tamagui/lucide-icons';
import { USER_ROLE } from '@/constants/User';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '@/store/slices/editProfile';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const options = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

export default function EditProfileScreen() {
  const dispatch = useDispatch();
  const handleChange = (name: string, value: string) => {
    formik.setFieldValue(name, value);
    dispatch(updateProfile({ ...formik.values, [name]: value }));
  };
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
      .matches(/^\d+$/, 'Phone must be only digits')
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

  const validationSchema =
    USER_ROLE === 'coach' ? coachValidationSchema : playerValidationSchema;

  const handleSubmit = (values: FormikValues) => {
    // Handle form submission
    console.log({ ...values });
  };

  const formik = useFormik({
    validateOnMount: true,
    initialValues,
    validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const getUserData = async () => {
    try {
      const email = await ReactNativeAsyncStorage.getItem('email')

      let querySnapshot = null
      if (USER_ROLE === 'coach')
        querySnapshot = await getDocs(
          query(collection(db, 'coach'), where('email', '==', email))
        );
      else
        querySnapshot = await getDocs(
          query(collection(db, 'player'), where('email', '==', email))
        );
      const docSnapshot = querySnapshot.docs[0];
      const data = docSnapshot.data();

      formik.setValues({
        ...formik.values,
        name: data.displayName || formik.values.name,
        email: data.email || formik.values.email,
        phone: data.phoneNumber || formik.values.phone,
        gender: data.gender || formik.values.gender,
        dateOfBirth: data.birthday || formik.values.dateOfBirth,
        club: data.club || formik.values.club,
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

  const calculatePaddingTop = () => {
    if (USER_ROLE === 'coach') {
      return 18;
    } else {
      return Platform.OS === 'ios' ? 90 : 30;
    }
  };

  const paddingTop = calculatePaddingTop();

  return (
    <YStack flex={1} paddingTop={paddingTop}>
      <ScrollView marginBottom={20} paddingHorizontal={16}>
        <YStack marginBottom={30} paddingRight={14}>
          <YStack alignItems="center">
            <PorfilePicture
              marginBottom={20}
              circular
              borderWidth={2}
              borderColor={Colors.primary}
              size="$9"
            />
            <Text
              style={{ fontFamily: 'Montserrat' }}
              fontSize={20}
              lineHeight={24}
              color={Colors.secondary}>
              Change profile picture
            </Text>
          </YStack>
        </YStack>

        <YStack gap={'$3'} minWidth={362} flex={1}>
          <YStack gap={'$3'}>
            <YStack>
              <CustomInput
                placeholder="Name"
                value={formik.values.name}
                onChangeText={(value) => {
                  formik.handleChange('name')
                  handleChange('name', value)
                }}
                onBlur={formik.handleBlur('name')}
                errors={formik.errors.name}
                validateOnInit
              />
            </YStack>
            <YStack>
              <CustomInput
                placeholder="Email"
                value={formik.values.email}
                onChangeText={(value) => {
                  formik.handleChange('email')
                  handleChange('email', value)
                }}
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
                handleChange={
                  (value: any) => {
                    formik.handleChange('countryCode')
                    handleChange('countryCode', value)
                  }}
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
                  onChangeText={
                    (value: any) => {
                      formik.handleChange('phone')
                      handleChange('phone', value)
                    }}
                  onBlur={formik.handleBlur('phone')}
                  errors={formik.errors.phone}
                  validateOnInit
                />
              </YStack>
            </YStack>
          </XStack>
          <YStack gap={'$3'}>
            <CustomDropdown
              options={options}
              selectedItem={formik.values.gender}
              handleChange={
                (value: any) => {
                  formik.handleChange('gender')
                  handleChange('gender', value)
                }}
              errors={formik.errors.gender}
              validateOnInit
            />
            <DatePicker
              date={formik.values.dateOfBirth}
              handleChange={
                (value: any) => {
                  formik.handleChange('dateOfBirth')
                  handleChange('dateOfBirth', value)
                }}
              errors={formik.errors.dateOfBirth}
              validateOnInit
            />
            {USER_ROLE === 'coach' && (
              <CustomInput
                placeholder="Club"
                value={formik.values.club}
                icon={<Search color={Colors.secondary} />}
                onChangeText={
                  (value: any) => {
                    formik.handleChange('club')
                    handleChange('club', value)
                  }}
                onBlur={formik.handleBlur('club')}
                errors={formik.errors.club}
                validateOnInit
              />
            )}
          </YStack>
          {/* <Button onPress={() => formik.handleSubmit()}>Save</Button> */}
        </YStack>
      </ScrollView>
    </YStack>
  );
}