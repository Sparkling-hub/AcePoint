import { Keyboard, SafeAreaView, StyleSheet, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { signUpPlayer } from '@/api/auth-api'
import {  Button,Heading, Input , Stack,Text } from 'tamagui';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CountryCodeDropdownPicker from 'react-native-dropdown-country-picker'
import { CheckboxWithLabel } from '@/components/CheckboxWithLabel';
import { Eye, EyeOff } from "@tamagui/lucide-icons";

const SignUp = ({onNext}:{onNext:() => void}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selected, setSelected] = useState('+44');
  const [country, setCountry] = useState({
    name:"United Kingdom",
    dial_code:"+44"
  });
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handlePressOutside = () => {
      Keyboard.dismiss();
  };
  const signUp=()=>{
    signUpPlayer({email,password,player:{
      displayName,
      phoneNumber:country.dial_code+phoneNumber,
      country:country.name
    }})
    onNext()
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handlePressOutside}
        >
      <Heading size={"$3"} style={styles.header}>SING UP</Heading>
      <Stack space="$5">
        <Input borderWidth={0}
          placeholder="Name and last name"
          onChangeText={(text: string) => setDisplayName(text)}
          value={displayName}
          style={styles.input}
        />
        <Input borderWidth={0}
          placeholder="Email"
          onChangeText={(text: string) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          style={styles.input}
        />
        <View>
        <CountryCodeDropdownPicker 
          selected={selected} 
          setSelected={setSelected}
          setCountryDetails={setCountry} 
          phone={phoneNumber} 
          setPhone={setPhoneNumber} 
          countryCodeContainerStyles={{paddingVertical: 10,backgroundColor: "#DADADA",}}
          countryCodeTextStyles={{fontSize:hp("4.5%")}}
          phoneStyles={{height:hp("10%"),
          width:wp("50%"),
          fontSize:hp("3%"),
          backgroundColor: "#DADADA",
          left:wp("0%"),}}
          dropdownStyles={{backgroundColor:"#DADADA"}}
        />
        </View> 
        <Stack>
          <Input  borderWidth={0}
            placeholder="Password"
            onChangeText={(text: string) => setPassword(text)}
            value={password}
            secureTextEntry={!passwordVisible}
            style={styles.input}
          />
               {passwordVisible ? (
        <EyeOff
          onPress={togglePasswordVisibility}
          color={"#3A4D6C"}
          style={{
            position: "absolute",
            right: 20,
            top: "35%",
            borderColor:"#3A4D6C"
          }}
        />
      ) : (
        <Eye
          onPress={togglePasswordVisibility}
          color={"#3A4D6C"}
          style={{
            position: "absolute",
            right: 20,
            top: "35%",
            borderColor:"#3A4D6C"
          }}
        />
      )}
          </Stack>
      </Stack>
      <Stack space="$3" style={styles.stack}>
      <CheckboxWithLabel size="$3" label='Marketing Comunication from Acepoint'  />
      <Text color={"#000000"} style={styles.text} >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo ex, 
      dapibus sit amet nisi ut, posuere laoreet nulla. Suspendisse dignissim elit in justo efficitur.
          </Text>
      <CheckboxWithLabel size="$3" label='Terms and Conditions & Privacy Policy' />
      <Text color={"#000000"}  style={styles.text}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo ex, dapibus sit amet nisi ut,
      posuere laoreet nulla. Suspendisse dignissim elit in justo efficitur.
          </Text>
          
      <Button onPress={signUp} style={styles.button}>Create Account</Button> 
      </Stack>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"#FFFFFF",
    alignItems: 'center',
  },
  input: {
    backgroundColor: "#DADADA",
    fontSize: 16,
    height:hp("10%"),
    width:wp("90%"),
    color:"#3A4D6C",
    borderWidth:0
    
  },
  header:{
    paddingTop:hp("4%"),
    fontFamily:"Montserrat",
    fontSize:hp("3%"),
    fontWeight:"700",
    color:"#3A4D6C",
    lineHeight: 21.94,
    alignItems:"center",
    justifyContent:"center",
    marginBottom:20,

  },
  stack:{
    marginTop:18,
    width:wp("80%"),
    left:wp("8%")
  },
  text:{
    fontSize:10,
    fontWeight:"400",
    fontFamily:"Montserrat",
    lineHeight: 12.19,
  },
  button:{
    marginTop:20,
    height:hp("6%"),
    width:wp("55%"),
    left:wp("7%"),
    backgroundColor:"#3A4D6C"
  },

});

export default SignUp

