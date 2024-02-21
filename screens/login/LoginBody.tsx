import { StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Text, View, YStack, XStack } from 'tamagui'
import { loginUser } from '@/api/auth-api'
<<<<<<< HEAD
import { storeData } from '@/api/localStorage'
=======
>>>>>>> 0376c0959368356cd611ab2042ba19a23b3a32fd
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Info } from '@tamagui/lucide-icons';
import { router } from 'expo-router';

<<<<<<< HEAD
const LoginBody = ({userType}:{userType:string}) => {
=======
const LoginBody = () => {
>>>>>>> 0376c0959368356cd611ab2042ba19a23b3a32fd
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const login = async () => {
<<<<<<< HEAD
    if (userType==='') {
      Alert.alert("please click on player or coach button");
    }
    if(userType!==''){
      try {
        storeData("userType",userType)
        const result: any = await loginUser({ email, password });
        if (result.user) {
          console.log("Login successful");
          router.push('/(tabs)')
          Alert.alert("Login Successful", "You have successfully logged in.");
        } else {
          console.log("Error occurred during login:", result.message);
          Alert.alert("Login Failed invalid-credential");
        }
      } catch (error: any) {
        console.error("Error occurred during login:", error.message);
        Alert.alert("Login Failed", error.message ?? "An unknown error occurred.");
      }
=======
    try {
      const result: any = await loginUser({ email, password });
      if (result.user) {
        console.log("Login successful");
        router.push('/(tabs)')
        Alert.alert("Login Successful", "You have successfully logged in.");
      } else {
        console.log("Error occurred during login:", result.message);
        Alert.alert("Login Failed invalid-credential");
      }
    } catch (error: any) {
      console.error("Error occurred during login:", error.message);
      Alert.alert("Login Failed", error.message ?? "An unknown error occurred.");
>>>>>>> 0376c0959368356cd611ab2042ba19a23b3a32fd
    }
  };
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Invalid email'),
      })}
      onSubmit={(values) => {
        //
      }}>
      {({ handleChange, handleBlur, values, errors, touched }) => (
<<<<<<< HEAD
        <YStack gap={'$3'} >
=======
        <YStack gap={'$4'} >
>>>>>>> 0376c0959368356cd611ab2042ba19a23b3a32fd
          <Input
            borderWidth={0}
            placeholder="Email"
            onChangeText={(text) => {
              handleChange('email')(text);
              setEmail(text);
            }}
            onBlur={handleBlur('email')}
            value={values.email}
            autoCapitalize="none"
            style={styles.input}
          />
          {errors.email &&
            <XStack alignItems="center" marginTop={5} marginLeft={5}>
              <Info size={18} color={'red'} marginRight={5} />
              <Text
                style={{ fontFamily: 'MontserratMedium' }}
                color={'red'}
                fontSize={12}>
                {errors.email}
              </Text>
            </XStack>
          }
          <View>
            <Input
              borderWidth={0}
              placeholder="Password"
              onChangeText={(text) => {
                handleChange('password')(text);
                setPassword(text);
              }}
              onBlur={handleBlur('password')}
              value={values.password}
              marginBottom={hp("5%")}
              secureTextEntry={!passwordVisible}
              style={styles.input}
            />
            {passwordVisible ? (
              <Text
                onPress={togglePasswordVisibility}
                color={"#A9D05C"}
                style={{
                  position: "absolute",
                  right: 15,
                  top: "15%",
                  borderColor: "#A9D05C",
                  fontFamily: "MontserratMedium",
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: 19.5,
                }}>Hide</Text>
            ) : (
              <Text
                onPress={togglePasswordVisibility}
                color={"#A9D05C"}
                style={{
                  position: "absolute",
                  right: 15,
                  top: "15%",
                  fontFamily: "MontserratMedium",
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: 19.5,
                  borderColor: "#A9D05C",
                }}>Show</Text>
            )}
          </View>
<<<<<<< HEAD
          <YStack marginTop={-40} alignItems='center' gap={'$4'}>
=======
          <YStack marginTop={-30} alignItems='center' gap={'$4'}>
>>>>>>> 0376c0959368356cd611ab2042ba19a23b3a32fd
            <Button onPress={login} style={styles.button}>Log In</Button>
            <Text style={styles.text}>Forgot your password?</Text>
          </YStack>
        </YStack>
      )}
    </Formik>


  )
}

export default LoginBody

const styles = StyleSheet.create({
  input: {
<<<<<<< HEAD
    backgroundColor: "white",
    fontSize: 16,
    height: 45,
    width:343,
=======
    backgroundColor: "#DADADA",
    fontSize: 16,
    height: hp("6.5%"),
    width: wp("90%"),
>>>>>>> 0376c0959368356cd611ab2042ba19a23b3a32fd
    color: "#3A4D6C",
    borderRadius: 50,

  },
  text: {
<<<<<<< HEAD
    marginBottom: wp("2%"),
=======
    marginBottom: wp("7%"),
>>>>>>> 0376c0959368356cd611ab2042ba19a23b3a32fd
    fontFamily: "Montserrat",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 17.07,
<<<<<<< HEAD
    color: "#FFFF"

  },
  button: {
    height: 44,
    width: 343,
=======

  },
  button: {
    height: hp("6.5%"),
    width: wp("90%"),
>>>>>>> 0376c0959368356cd611ab2042ba19a23b3a32fd
    backgroundColor: "#A9D05C",
    color: "#3A4D6C",
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 19.5,
  },
})