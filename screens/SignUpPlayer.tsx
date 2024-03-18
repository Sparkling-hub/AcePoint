import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import SignUp from './coach/signUp';
import Levling from './player/Levling';
import Question from './player/Question';
import { signUpPlayer } from '@/api/auth-api';
import { useSelector } from 'react-redux';

const SignUpPlayer = () => {
  const select=useSelector((state:any) => state.signUp)
  const [progress, setProgress] = useState(34);
  const handleNext = () => setProgress(progress + 34);
  const signUp = async () => {
    await signUpPlayer({
      email:select.userEmailPassword.email,
      password:select.userEmailPassword.password,
      player: select.user
    })
  }
  const handlePrevious  = () => setProgress(progress - 34);
  return (
    <SafeAreaView style={styles.container}>
      {progress === 34 && <SignUp onNext={handleNext} />}
      {progress === 68 && <Levling onNext={handleNext} handlePrevious={handlePrevious} />}
      {progress === 102 && <Question handlePrevious={handlePrevious} onNext={signUp}  />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignUpPlayer;
