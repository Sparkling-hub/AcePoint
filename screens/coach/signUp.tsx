import React, { useState } from 'react';
import {Platform, ScrollView } from 'react-native';
import * as Yup from 'yup';
import CustomInput from '@/components/Form/CustomInput';
import CountryCodePicker from '@/components/Form/CountryCodePicker';
import Button from '@/components/Button';
import ProgressBar from '@/components/ProgressBar';
import HeaderArrow from '@/components/HeaderArrow';
import { router } from 'expo-router';
import { XStack, YStack } from 'tamagui';
import { CheckboxWithLabel } from '@/components/CheckboxWithLabel';
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import fireToast from '@/components/toast/Toast'
const SignUp = ({ onNext }: { onNext: (email: string, password: string, data: any) => void }) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('+44');
  const [marketing, setMarketing] = useState(false);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({
    displayName:undefined,
    phoneNumber:undefined,
    email:undefined,
    password:undefined,
  }); // State to hold validation errors

  const back = () => {
    router.back();
  };

  const sign = () => {
    let data = {
      displayName: displayName,
      phoneNumber: countryCode + phoneNumber,
      marketing: marketing,
      terms: terms
    };

    if (terms) {
      onNext(email, password, data);
    } else {
      fireToast({message:"You must check the terms",type:"error"});
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const onCheckedChangeTerms = () => {
    setTimeout(() => setTerms(!terms), 0);
    
  };
  const onCheckedChangeMarketing = () => {
    setTimeout(() => setMarketing(!marketing), 0);
  };
  console.log(terms,marketing)
  const validate = async () => {
    try {
      await Yup.object().shape({
        displayName: Yup.string().required('Name and last name are required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phoneNumber: Yup.string().required('Phone number is required').min(6),
        password: Yup.string().required('Password is required').min(6),
        countryCode: Yup.string().required('Country code is required'),
      }).validate({
        displayName,
        email,
        phoneNumber,
        password,
        countryCode,
      }, { abortEarly: false });
      setErrors({}); // Reset errors if validation succeeds
      return true;
    } catch (error:any) {
      const validationErrors = error.inner.reduce((errors, currentError) => {
        return {
          ...errors,
          [currentError.path]: currentError.message
        };
      }, {});
      setErrors(validationErrors); // Set errors if validation fails
      return false;
    }
  } 
   return (
    <YStack flex={1} paddingTop={Platform.OS === 'ios' ? 90 : 20}>
      <ScrollView >
        <YStack marginBottom={10} marginTop={-10}>
          <YStack alignItems="flex-start" gap={"$4"} marginLeft={20}>
            <HeaderArrow back={back} gap={"$11"} data={"SIGN UP"} />
          </YStack>
        </YStack>
        <YStack width={400} marginBottom={40} marginLeft={17} >
          <ProgressBar value={20} />
        </YStack>
        <YStack paddingHorizontal={20} gap={'$3'} minWidth={362} flex={1}>
          <YStack gap={'$3'}>
            <CustomInput
              placeholder="Name and last name"
              value={displayName}
              onChangeText={(text) => setDisplayName(text)}
              errors={errors.displayName}
            />
            <CustomInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              errors={errors.email}
             
            />
          </YStack>
          <XStack gap={'$3'}>
            <YStack flex={1}> 
               <CountryCodePicker
               countryCode={countryCode}
               handleChange={(text: any) => setCountryCode(text)}
              /> 
            </YStack>
            <YStack flex={2}>
              <YStack>
                <CustomInput
                  placeholder="Phone"
                  keyboardType="numeric"
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text)}
                  errors={errors.phoneNumber}
                  
                />
              </YStack>
            </YStack>
          </XStack>
          {passwordVisible ? (
            <CustomInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              errors={errors.password}
              hide={passwordVisible}
                icon={<EyeOff color={"#3A4D6C"} 
                onPress={togglePasswordVisibility}
                style={{borderColor:"#3A4D6C"}} />} 
            />
          ) : (
            <CustomInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              errors={errors.password}
              hide={passwordVisible}
              icon={<Eye color={"#3A4D6C"} 
              onPress={togglePasswordVisibility}
              style={{borderColor:"#3A4D6C"}} />
            }
            />
          )}
          <CheckboxWithLabel
            size="$3"
            label='Marketing Comunication from Acepoint'
            checked={marketing}
            onPress={onCheckedChangeMarketing}
          />
          <CheckboxWithLabel
            size="$3"
            label='Terms and Conditions & Privacy Policy'
            terms={terms}
            onPress={onCheckedChangeTerms}
            checked={terms}
          />
          <Button text="Create Account" onPress={async () => {
            const isValid = await validate();
            if (isValid) {
              sign();
            }
          }} />
        </YStack>
      </ScrollView>
    </YStack>
  );
}

export default SignUp;
