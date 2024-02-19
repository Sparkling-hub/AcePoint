import { StyleSheet,ImageBackground,SafeAreaView, Keyboard, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Button, Image, Input, Stack, Text, View } from 'tamagui'
import { loginUser } from '@/api/auth-api'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginPlayer = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handlePressOutside = () => {
        Keyboard.dismiss();
    };
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
      const login=()=>{
        console.log("log in")
        loginUser({email:email,password:password})
      }
  return (
    <SafeAreaView style={styles.container}>
    <ImageBackground
        source={require('@/assets/images/bg.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <TouchableOpacity
            activeOpacity={1}
            onPress={handlePressOutside}>
            <Image
                source={require('@/assets/images/acepointicon.png')}
                style={[{ width: 118, height: 27 }, styles.image]}
            />
            <Stack space='$6' style={styles.stack}>
                <Image
                    source={require('@/assets/images/playericon.png')}
                    style={[{ width: 105, height: 105 },{marginLeft:7}]}
                />
                <Text style={styles.Login}>Log In</Text>
            </Stack>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Invalid email').required('Required'),
                    password: Yup.string().required('Required'),
                })}
                onSubmit={(values) => {
                    loginUser(values);
                }}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <Stack space='$3' style={styles.stackContainer}>
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
                            borderRadius={50}
                            style={styles.input}
                            placeholderTextColor='#3A4D6C'
                        />
                        {touched.email && errors.email &&
                            <Text style={{ color: 'red' }}>{errors.email}</Text>
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
                            borderRadius={50}
                            marginBottom={hp("5%")}
                            secureTextEntry={!passwordVisible}
                            style={styles.input}
                            placeholderTextColor='#3A4D6C'
                        />
                        {touched.password && errors.password &&
                            <Text style={{ color: 'red' }}>{errors.password}</Text>
                        }
                        {passwordVisible ? (
                            <Text
                                onPress={togglePasswordVisibility}
                                color={"#A9D05C"}
                                style={{
                                    position: "absolute",
                                    right: hp("5%"),
                                    top: "15%",
                                    borderColor: "#A9D05C",
                                }}>Hide</Text>
                        ) : (
                            <Text
                                onPress={togglePasswordVisibility}
                                color={"#A9D05C"}
                                style={{
                                    position: "absolute",
                                    right: hp("5%"),
                                    top: "15%",
                                    borderColor: "#A9D05C",
                                }}>Show</Text>
                        )}
                        </View>
                        <Button onPress={login} style={styles.button}>Log In</Button>
                        <Text style={styles.text}>Forgot your password?</Text>
                    </Stack>
                )}
            </Formik>
            <Image
                source={require('@/assets/images/sparklingicon.png')}
                style={[{ width: 173, height: 32 }, styles.sparkling]}
            />
        </TouchableOpacity>
    </ImageBackground>
</SafeAreaView>

 
  )
}

export default LoginPlayer

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: "#DADADA",
    fontSize: 16,
    height:hp("6.5%"),
    width:wp("90%"),
    color:"#3A4D6C",
    borderRadius:50,
    
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    marginLeft:wp("33%"),
    marginTop:wp("20%"),
    marginBottom:wp('20%')
  },
  stack: {
    marginLeft:wp("35%"),
    marginTop:wp("-2%"),
  },
  sparkling: {
    marginLeft:wp("30%"),
    marginTop:wp("5%"),
  },
  stackContainer: {
    marginTop:wp("20%"),
    alignItems:"center" ,
  },
  text: {
    marginBottom:wp("7%"),
    fontFamily:"Montserrat",
    fontWeight:"400", 
    fontSize:14,
    lineHeight: 17.07, 
    
  },
  Login: {
    marginLeft:wp("5%"),
    fontFamily:"Montserrat",
    fontWeight:"700", 
    fontSize:30,
    lineHeight: 36.57, 
    alignItems:"center" ,
    color:"#3A4D6C" 
  },
  button:{
    height:hp("6.5%"),
    width:wp("90%"),
    backgroundColor:"#A9D05C",
    color:"#3A4D6C",
    borderRadius:50,
    fontFamily:"Montserrat",
    fontWeight:"700", 
    fontSize:16,
    lineHeight: 19.5, 
},
})