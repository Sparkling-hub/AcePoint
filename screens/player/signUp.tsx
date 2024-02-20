import { Keyboard, Platform, SafeAreaView} from 'react-native'
import React, { useState } from 'react'
import { signUpPlayer } from '@/api/auth-api'
import { Text, View, XStack, YStack } from 'tamagui';
import { CheckboxWithLabel } from '@/components/CheckboxWithLabel';
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ScrollView } from 'tamagui';
import Colors from '@/constants/Colors';
import CustomInput from '@/components/Form/CustomInput';
import CountryCodePicker from '@/components/Form/CountryCodePicker';
import Button from '@/components/Button'
import ProgressBar from '@/components/ProgressBar';

const SignUp = ({onNext}:{onNext:() => void}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [country, setCountry] = useState('+44');
  const [marketing, setMarketing] = useState(false);
  const [terms, setTerms] = useState(false);
  console.log(marketing,terms)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const onCheckedChangeTerms = () => {
    setTerms(!terms)
  };
  const onCheckedChangeMarketing = () => {
    setMarketing(!marketing)
  };
   const signUp=()=>{
     signUpPlayer({email,password,player:{
        displayName,
        phoneNumber:country+phoneNumber,
        marketing:marketing,
        terms:terms
     }})
     onNext()
   }
  return (
    <Formik
      initialValues={{
        displayName: displayName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        countryCode:country
      }}
      validationSchema={Yup.object().shape({
        displayName: Yup.string().required('Name and last name are required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        password: Yup.string().required('Password is required').min(6),
        countryCode: Yup.string().required('Country code is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
      }}
    >
    {formikProps => (
    <YStack flex={1} paddingTop={Platform.OS === 'ios' ? 90 : 20}>
        <ScrollView marginBottom={20}>
         <YStack marginBottom={30}>
          <YStack alignItems="center" gap={"$4"}>
            <Text
              style={{ fontFamily: 'MontserratBold' }}
              fontSize={20}
              lineHeight={24}
              color={Colors.secondary}>
              Sign Up 
            </Text>
          </YStack>
           <View marginLeft={20} marginTop={25} ><ProgressBar value={20}/></View>
         </YStack>
         <YStack paddingHorizontal={20} gap={'$3'} minWidth={362} flex={1}>
          <YStack gap={'$3'}>
            <YStack>
              <CustomInput
                placeholder="Name and last name"
                value={formikProps.values.displayName}
                onChangeText={(text) => {
                  formikProps.handleChange('displayName')(text); 
                  setDisplayName(text); 
                }}
              onBlur={formikProps.handleBlur('displayName')}
                errors={formikProps.errors.displayName}
                validateOnInit
              />
            </YStack>
            <YStack>
              <CustomInput
                placeholder="Email"
                value={formikProps.values.email}
                onChangeText={(text) => {
                  formikProps.handleChange('email')(text); 
                  setEmail(text); 
                }}
                onBlur={formikProps.handleBlur('email')}
                errors={formikProps.errors.email}
                validateOnInit
              />
            </YStack>
          </YStack>
          <XStack gap={'$3'}>
            <YStack flex={1}> 
               <CountryCodePicker
                countryCode={formikProps.values.countryCode}
                handleChange={(text:any) => {
                  formikProps.handleChange('countryCode')(text); 
                  setCountry(text); 
                }}
                errors={formikProps.errors.countryCode}
                validateOnInit
              /> 
            </YStack>
            <YStack flex={2}>
              <YStack>
                <CustomInput
                  placeholder="Phone"
                  keyboardType="numeric"
                  value={formikProps.values.phoneNumber}
                  onChangeText={(text) => {
                    formikProps.handleChange('phoneNumber')(text); 
                    setPhoneNumber(text); 
                  }}
                  onBlur={formikProps.handleBlur('phoneNumber')}
                  errors={formikProps.errors.phoneNumber}
                  validateOnInit
                />
              </YStack>
            </YStack>
          </XStack>
          <YStack gap={'$3'}>
          {passwordVisible ?(
          <CustomInput
                placeholder="password"
                value={formikProps.values.password}
                onChangeText={(text) => {
                  formikProps.handleChange('password')(text); 
                  setPassword(text); 
                }}
              onBlur={formikProps.handleBlur('password')}
                errors={formikProps.errors.password}
                validateOnInit
                hide={passwordVisible}
                icon={<EyeOff color={"#3A4D6C"} 
                onPress={togglePasswordVisibility}
                style={{borderColor:"#3A4D6C"}} />}  
              />
          ):(
              <CustomInput
              placeholder="password"
              value={formikProps.values.password}
              onChangeText={(text) => {
                formikProps.handleChange('password')(text); 
                setPassword(text); 
              }}
            onBlur={formikProps.handleBlur('password')}
              errors={formikProps.errors.password}
              validateOnInit
              hide={passwordVisible}
              icon={<Eye color={"#3A4D6C"} 
              onPress={togglePasswordVisibility}
              style={{borderColor:"#3A4D6C"}} />
            }  
            />
            )} 
          </YStack>
          <YStack gap={'$3'}>
          <CheckboxWithLabel size="$3" label='Marketing Comunication from Acepoint'   onPress={onCheckedChangeMarketing} />
          </YStack>
          <YStack gap={'$3'}>
          <CheckboxWithLabel size="$3" label='Terms and Conditions & Privacy Policy'   onPress={onCheckedChangeTerms} />
          </YStack>
          <YStack gap={'$3'} style={{alignItems:'center'}}>
          <Button text={"Create Account"} onPress={signUp}></Button> 
          </YStack>
        </YStack>
        </ScrollView>
    </YStack>
    )}
    </Formik>
  );
}


export default SignUp
