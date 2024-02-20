import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Progress } from 'tamagui';
import SignUp from './coach/signUp';
import Levling from './player/Levling';
import Question from './player/Question';
import { signUpPlayer } from '@/api/auth-api';

const SignUpPlayer = () => {
  const [progress, setProgress] = useState(34);
  const handleNext = () => setProgress(progress + 34);
  const signUp=(email:string,password:string,data:any)=>{
    signUpPlayer({email,password,player:{
        displayName:data.displayName,
        phoneNumber:data.phoneNumber,
        marketing:data.marketing,
        terms:data.terms
     }})
     handleNext()
   }
  return (
    <SafeAreaView style={styles.container}>
      <Progress value={progress} style={styles.progress}>
      </Progress>
      {progress === 34 && <SignUp onNext={signUp} />}
      {progress === 68 && <Levling onNext={handleNext} />}
      {progress === 102 && <Question />}
    </SafeAreaView>
  );
};

export default SignUpPlayer;

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