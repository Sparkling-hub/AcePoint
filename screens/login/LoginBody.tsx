import { StyleSheet,Alert } from 'react-native'
import React, { useState } from 'react'
import { Button, Input, Text, View, YStack,XStack } from 'tamagui'
import { loginUser } from '@/api/auth-api'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Info } from '@tamagui/lucide-icons';

const LoginBody = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
      const login = async () => {
        try {
          const result:any = await loginUser({ email, password });
          if (result.user) {
            console.log("Login successful");
            Alert.alert("Login Successful", "You have successfully logged in.");
          } else {
            console.log("Error occurred during login:", result.message);
            Alert.alert("Login Failed invalid-credential");
          }
        } catch (error:any) {
          console.error("Error occurred during login:", error.message);
          Alert.alert("Login Failed", error.message ?? "An unknown error occurred.");
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
                    <YStack gap={'$4'} >
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
                        { errors.email &&
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
                                    fontFamily:"MontserratMedium",
                                    fontWeight:500,
                                    fontSize:16,
                                    lineHeight:19.5,
                                }}>Hide</Text>
                        ) : (
                            <Text
                                onPress={togglePasswordVisibility}
                                color={"#A9D05C"}
                                style={{
                                    position: "absolute",
                                    right:15,
                                    top: "15%",
                                    fontFamily:"MontserratMedium",
                                    fontWeight:500,
                                    fontSize:16,
                                    lineHeight:19.5,
                                    borderColor: "#A9D05C",
                                }}>Show</Text>
                        )}
                        </View>
                        <YStack marginTop={-30} alignItems='center' gap={'$4'}>
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
    backgroundColor: "#DADADA",
    fontSize: 16,
    height:hp("6.5%"),
    width:wp("90%"),
    color:"#3A4D6C",
    borderRadius:50,
    
  },
  text: {
    marginBottom:wp("7%"),
    fontFamily:"Montserrat",
    fontWeight:"400", 
    fontSize:14,
    lineHeight: 17.07, 
    
  },
  button:{
    height:hp("6.5%"),
    width:wp("90%"),
    backgroundColor:"#A9D05C",
    color:"#3A4D6C",
    fontFamily:"Montserrat",
    fontWeight:"700", 
    fontSize:16,
    lineHeight: 19.5, 
},
})