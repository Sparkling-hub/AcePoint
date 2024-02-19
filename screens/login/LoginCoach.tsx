import { StyleSheet,ImageBackground,SafeAreaView, Keyboard, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Button, Image, Input, Stack, Text } from 'tamagui'
import { loginUser } from '@/api/auth-api'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const LoginCoach = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const handlePressOutside = () => {
        Keyboard.dismiss();
    };
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
  return (
    <SafeAreaView style={styles.container}>
        <ImageBackground
        source={require('@/assets/images/bg.png')} // Change the path to your image
        style={styles.backgroundImage}
        resizeMode="cover">
             <TouchableOpacity
        activeOpacity={1}
        onPress={handlePressOutside}
        >
          <Image
            source={require('@/assets/images/acepointicon.png')}
            style={[{ width: 118, height: 27 },styles.image]}
          />
         <Stack space='$6' style={styles.stack}>
          <Image
            source={require('@/assets/images/coachicon.png')}
            style={[{ width: 105, height: 105 }]}
          />
        <Text  style={styles.Login}>Log In</Text>

         </Stack>
         <Stack space='$3' style={styles.stackContainer}>
         <Input borderWidth={0}
          placeholder="Email"
          onChangeText={(text: string) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          borderRadius={50}
          style={styles.input}
          placeholderTextColor='#3A4D6C'
        />
        <Input  borderWidth={0}
            placeholder="Password"
            onChangeText={(text: string) => setPassword(text)}
            value={password}
            borderRadius={50}
            marginBottom={hp("5%")}
            secureTextEntry={!passwordVisible}
            style={styles.input}
            placeholderTextColor='#3A4D6C'
          />
              {passwordVisible ? (
                <Text
                    onPress={togglePasswordVisibility}
                    color={"#A9D05C"}
                    style={{
                    position: "absolute",
                    right: hp("5%"),
                    top: "27%",
                    borderColor:"#A9D05C",
                    }}
                >Hide</Text>
                ) : (
                <Text
                    onPress={togglePasswordVisibility}
                    color={"#A9D05C"}
                    style={{
                    position: "absolute",
                    right: hp("5%"),
                    top: "27%",
                    borderColor:"#A9D05C",
                    }}
                >Show</Text> 
                )}
         <Button  style={styles.button}>Log In</Button>
         <Text  style={styles.text}>Forgot your password?</Text>
         </Stack>
         <Image
              source={require('@/assets/images/sparklingicon.png')} 
              style={[{ width: 173, height: 32 },styles.sparkling]}
            />
            </TouchableOpacity>
        </ImageBackground>
        </SafeAreaView>

 
  )
}

export default LoginCoach

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
    marginTop:wp("2%"),
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