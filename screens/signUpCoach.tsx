import { StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import SignUp from './coach/signUp';
import Information from './coach/Information';
import Trail from './coach/Trail';
import { signUpCoach } from '@/api/auth-api';


const SignUpCoach = () => {
  const [progress, setProgress] = useState(34);
  const handleNext = () => setProgress(progress + 34);

  const signUp=(email:string,password:string,data:any)=>{
    signUpCoach({email,password,coach:{
        displayName:data.displayName,
        phoneNumber:data.phoneNumber,
        marketing:data.marketing,
        terms:data.terms
     }})
     handleNext()
   }
  return  (
    <SafeAreaView style={styles.container}>
      {progress === 34 && <SignUp onNext={signUp} />}
      {progress === 68 && <Information onNext={handleNext} />}
      {progress === 102 && <Trail  />}
    
    </SafeAreaView>
  );
}

export default SignUpCoach
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#FFFF',
    alignItems: 'center',
  },
  progress: {
    backgroundColor: '#FFFF',
  },
  bounce: {
    backgroundColor: '#3A4D6C',
  },
});