import { StyleSheet,ImageBackground,SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Button, Image, Stack, Text } from 'tamagui'
import { loginUser } from '@/api/auth-api'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const login=()=>{
        loginUser({email:email,password:password})
      }
  return (
        <SafeAreaView style={styles.container}>
        <ImageBackground
        source={require('@/assets/images/bg.png')} // Change the path to your image
        style={styles.backgroundImage}
        resizeMode="cover">
          <Image
            source={require('@/assets/images/acepointicon.png')}
            style={[{ width: 320, height: 74 },styles.image]}
          />
         <Stack space='$7' style={styles.stack}>
          <Image
            source={require('@/assets/images/playericon.png')}
            style={[{ width: 105, height: 105 }]}
          />
          <Image
            source={require('@/assets/images/coachicon.png')} 
            style={[{ width: 105, height: 105 }]}
          />
         </Stack>
         <Stack space='$4' style={styles.stackContainer}>
         <Button  style={styles.button}>Log In</Button>
         <Text  style={styles.text}>Forgot your password?</Text>
         <Button  style={styles.button}>Sign Up</Button>
         </Stack>

         <Image
              source={require('@/assets/images/sparklingicon.png')} 
              style={[{ width: 173, height: 32 },styles.sparkling]}
            />
        </ImageBackground>
        </SafeAreaView>

 
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    marginLeft:wp("10%"),
    marginTop:wp("40%"),
  },
  stack: {
    flexDirection: 'row',
    marginLeft:wp("19%"),
    marginTop:wp("22%"),
  },
  sparkling: {
    marginLeft:wp("30%"),
    marginTop:wp("15%"),
  },
  stackContainer: {
    marginTop:wp("20%"),
  },
  text: {
    marginLeft:wp("30%"),
    marginBottom:wp("7%"),
    fontFamily:"Montserrat",
    fontWeight:"400", 
    fontSize:14,
    lineHeight: 17.07,  
  },
  button:{
    height:hp("6.5%"),
    width:wp("90%"),
    left:wp("5%"),
    backgroundColor:"#A9D05C",
    color:"#3A4D6C",
    borderRadius:50,
    fontFamily:"Montserrat",
    fontWeight:"700", 
    fontSize:16,
    lineHeight: 19.5, 
},
})