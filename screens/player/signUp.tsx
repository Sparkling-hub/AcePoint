import { Keyboard, SafeAreaView, StyleSheet, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { signUpPlayer } from '@/api/auth-api'
import {  Button,Heading, Input , Stack,Text } from 'tamagui';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CountryCodeDropdownPicker from 'react-native-dropdown-country-picker'
import { CheckboxWithLabel } from '@/components/CheckboxWithLabel';
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignUp = ({onNext}:{onNext:() => void}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selected, setSelected] = useState('+44');
  const [country, setCountry] = useState({
    name:"United Kingdom",
    dial_code:"+44",
    code:"UK"
    }); 
  const [marketing, setMarketing] = useState(false);
  const [terms, setTerms] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handlePressOutside = () => {
      Keyboard.dismiss();
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
       phoneNumber:country.dial_code+phoneNumber,
       country:country.name,
      marketing:marketing,
      terms:terms
    }})
    onNext()
  }
  return (
    <Formik
      initialValues={{
        displayName: '',
        email: '',
        phoneNumber: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        displayName: Yup.string().required('Name and last name are required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        password: Yup.string().required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
      }}
    >
    {formikProps => (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handlePressOutside}
        >
      <Heading size={"$3"} style={styles.header}>SING UP</Heading>
      <Stack space="$5">
        
      <Input
        borderWidth={0}
        placeholder="Name and last name"
        onChangeText={(text) => {
          formikProps.handleChange('displayName')(text); 
          setDisplayName(text); 
      }}
        onBlur={formikProps.handleBlur('displayName')}
        value={formikProps.values.displayName}
        style={styles.input}
        placeholderTextColor='#3A4D6C'
              />
          {formikProps.touched.displayName && formikProps.errors.displayName &&
                <Text style={{ color: 'red' }}>{formikProps.errors.displayName}</Text>
              }
        <Input
                borderWidth={0}
                placeholder="Email"
                onChangeText={(text) => {
                  formikProps.handleChange('email')(text); 
                  setEmail(text); 
              }}
                onBlur={formikProps.handleBlur('email')}
                value={formikProps.values.email}
                autoCapitalize="none"
                style={styles.input}
                placeholderTextColor='#3A4D6C'
              />
              {formikProps.touched.email && formikProps.errors.email &&
                <Text style={{ color: 'red' }}>{formikProps.errors.email}</Text>
              }
        <View>
         <Stack style={styles.stackPhone}>
         <View>
            <CountryCodeDropdownPicker 
          selected={selected} 
          setSelected={setSelected}
          setCountryDetails={setCountry} 
          countryCodeContainerStyles={{paddingVertical: 10,backgroundColor: "#DADADA"}}
          countryCodeTextStyles={{fontSize:hp("4.5%")}}
          dropdownStyles={{backgroundColor:"#F5F5F5",maxWidth:500}}
          code={country.code}
          searchStyles={{backgroundColor:"#DADADA",height:49,width:"90%",marginLeft:15}}
        />         
          </View>        
          <Input
            borderWidth={0}
            placeholder="Phone"
            onChangeText={(text) => {
              formikProps.handleChange('phoneNumber')(text); 
              setPhoneNumber(text); 
          }}
            onBlur={formikProps.handleBlur('phoneNumber')}
            value={formikProps.values.phoneNumber}
            style={styles.phone}
            keyboardType='numeric'
            placeholderTextColor='#3A4D6C'
          />
                  
         </Stack>
         {formikProps.touched.phoneNumber && formikProps.errors.phoneNumber &&
                    <Text style={{ color: 'red' }}>{formikProps.errors.phoneNumber}</Text>
                  }
        </View> 
        <Stack style={styles.pasStack}>
        <Input
            borderWidth={0}
            placeholder="Password"
            onChangeText={(text) => {
            formikProps.handleChange('password')(text); 
            setPassword(text); 
          }}
          onBlur={formikProps.handleBlur('password')}
          value={formikProps.values.password}
          secureTextEntry={!passwordVisible}
          style={styles.input}
          placeholderTextColor='#3A4D6C'
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
       {formikProps.touched.password && formikProps.errors.password &&
                  <Text style={{ color: 'red' }}>{formikProps.errors.password}</Text>
                }
          </Stack>
      </Stack>
      <Stack space="$3" style={styles.stack}>
      <CheckboxWithLabel size="$3" label='Marketing Comunication from Acepoint'   onPress={onCheckedChangeMarketing} />
      <Text color={"#000000"} style={styles.text} >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo ex, 
      dapibus sit amet nisi ut, posuere laoreet nulla. Suspendisse dignissim elit in justo efficitur.
          </Text>
      <CheckboxWithLabel size="$3" label='Terms and Conditions & Privacy Policy'   onPress={onCheckedChangeTerms} />
      <Text color={"#000000"}  style={styles.text}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo ex, dapibus sit amet nisi ut,
      posuere laoreet nulla. Suspendisse dignissim elit in justo efficitur.
          </Text>
          
      <Button onPress={signUp} style={styles.button}>Create Account</Button> 
      </Stack>
      </TouchableOpacity>
    </SafeAreaView>
    )}
    </Formik>
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
    borderWidth:0,
    
  },
  phone: {
    backgroundColor: "#DADADA",
    fontSize: 16,
    height:66,
    width:wp("48%"),
    color:"#3A4D6C",
    borderWidth:0,
  },
  stackPhone: {
    flexDirection: 'row',
    justifyContent:"space-between"


  },
  header:{
    paddingTop:hp("4%"),
    fontFamily:"Montserrat",
    fontSize:hp("3%"),
    fontWeight:"700",
    color:"#3A4D6C",
    lineHeight: 21.94,
    marginBottom:20,
    textAlign: "center"
  },
  stack:{
    marginTop:18,
    width:wp("80%"),
    left:wp("8%"),
    zIndex:-1
  },
  pasStack:{

    zIndex:-1
  },
  text:{
    fontSize:10,
    fontWeight:"400",
    fontFamily:"Montserrat",
    lineHeight: 12.19,
    marginLeft:hp("4.5%")
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

