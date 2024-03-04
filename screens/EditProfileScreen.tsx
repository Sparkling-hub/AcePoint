import Colors from '@/constants/Colors';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, ScrollView, Text, XStack, YStack } from 'tamagui';
import DatePicker from '@/components/frontend/Form/DatePicker';
import { useEffect, useRef, useState } from 'react';
import CountryCodePicker from '@/components/frontend/Form/CountryCodePicker';
import CustomDropdown from '@/components/frontend/Form/dropdown/CustomDropdown';
import { FormikValues, useFormik } from 'formik';
import * as Yup from 'yup';
import { Platform } from 'react-native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '@/components/frontend/Form/CustomInput';
import { Search } from '@tamagui/lucide-icons';
import { updateProfile } from '@/store/slices/editProfile';
import {
  collection,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db, doc } from '@/lib/firebase';
import fireToast from '@/services/toast';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';

import EditProfileSkeleton from '@/components/frontend/skeletons/EditProfileSkeleton';

const options = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

export default function EditProfileScreen() {
  const scrollViewRef = useRef(null);
  const dispatch = useDispatch();

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

  const userRole = useSelector((state: RootState) => state.userRole);
  const userRoleValue = userRole.userRole;

  const validationSchema =
    userRoleValue === 'Coach' ? coachValidationSchema : playerValidationSchema;

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
  const handleChange = (name: string, value: string) => {
    formik.setFieldValue(name, value);
    dispatch(updateProfile({ ...formik.values, [name]: value }));
  };

  const handleSelectProfilePicture = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        await handleProfilePictureChange(imageUri);
      }
    } catch (error) {
      console.error('Error selecting profile picture:', error);
    }
  };

  const handleProfilePictureChange = async (imageUri: string) => {
    try {
      setIsLoading(true);
      const userId = await ReactNativeAsyncStorage.getItem('userID');
      const storage = getStorage();
      const imageRef = ref(storage, `profileImage/${userId}`);
      console.log(userId);

      const response = await fetch(imageUri);

      const blob = await response.blob();

      await uploadBytes(imageRef, blob);

      const downloadURL = await getDownloadURL(imageRef);
      let userDocRef = doc(db, 'coach', userId);
      if (userRoleValue === 'Player') userDocRef = doc(db, 'player', userId);

      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, { picture: downloadURL });
      } else {
        await updateDoc(userDocRef, {
          picture: downloadURL,
        });
      }
      setImg(downloadURL);
      fireToast('success', 'Profile picture uploaded successfully');
      console.log('Profile picture uploaded successfully:', downloadURL);
    } catch (error) {
      fireToast('error', 'Error uploading profile picture');
      console.error('error', 'Error uploading profile picture:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const [img, setImg] = useState('');
  useEffect(() => {
    const getUserData = async () => {
      try {
        const email = await ReactNativeAsyncStorage.getItem('email');
        let querySnapshot = null
        if (userRoleValue === 'Coach')
          querySnapshot = await getDocs(
            query(collection(db, 'coach'), where('email', '==', email))
          );
        else {
          querySnapshot = await getDocs(
            query(collection(db, 'player'), where('email', '==', email))
          );
        }
        const docSnapshot = querySnapshot.docs[0];
        const data = docSnapshot.data();
        setImg(data.picture);
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
    getUserData();
  }, []);

  const calculatePaddingTop = () => {
    if (userRoleValue === 'Coach') {
      return 18;
    } else {
      return Platform.OS === 'ios' ? 90 : 30;
    }
  };

  const paddingTop = calculatePaddingTop();

  if (isLoading) {
    return (
      <YStack flex={1} paddingTop={paddingTop} paddingHorizontal={16}>
        <EditProfileSkeleton />
      </YStack>
    );
  }

  return (
    <YStack flex={1} paddingTop={paddingTop}>
      <ScrollView marginBottom={20} paddingHorizontal={16} ref={scrollViewRef}>
        <YStack marginBottom={30} paddingRight={14}>
          <YStack alignItems="center">
            <Avatar
              marginBottom={20}
              circular
              borderWidth={2}
              borderColor={Colors.primary}
              size="$9">
              <Avatar.Image src={img} />
            </Avatar>
            <Text
              onPress={handleSelectProfilePicture}
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
                  formik.handleChange('name');
                  handleChange('name', value);
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
                  formik.handleChange('email');
                  handleChange('email', value);
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
                handleChange={(value: any) => {
                  formik.handleChange('countryCode');
                  handleChange('countryCode', value);
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
                  onChangeText={(value: any) => {
                    formik.handleChange('phone');
                    handleChange('phone', value);
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
              scrollViewRef={scrollViewRef}
              selectedItem={formik.values.gender}
              handleChange={(value: any) => {
                formik.handleChange('gender');
                handleChange('gender', value);
              }}
              errors={formik.errors.gender}
              validateOnInit
            />
            <DatePicker
              date={formik.values.dateOfBirth}
              handleChange={(value: any) => {
                formik.handleChange('dateOfBirth');
                handleChange('dateOfBirth', value);
              }}
              errors={formik.errors.dateOfBirth}
              validateOnInit
            />
            {userRoleValue === 'Coach' && (
              <CustomInput
                placeholder="Club"
                value={formik.values.club}
                icon={<Search color={Colors.secondary} />}
                onChangeText={(value: any) => {
                  formik.handleChange('club');
                  handleChange('club', value);
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
