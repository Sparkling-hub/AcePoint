import { StyleSheet, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import SignUp from './coach/signUp';
import Information from './coach/Information';
import Trail from './coach/Trail';
import { signUpCoach } from '@/api/auth-api';
import { useSelector } from 'react-redux';

const SignUpCoach = () => {
  const [progress, setProgress] = useState(34);
  const handleNext = () => setProgress(progress + 34);
  const handlePrevious = () => setProgress(progress - 34);
  const select=useSelector((state:any) => state.signUp)
  console.log(select)
  const signUp = async () => {
    await signUpCoach({
      email:select.userEmailPassword.email,
      password:select.userEmailPassword.password,
      coach: select.user
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      {progress === 34 && <SignUp onNext={handleNext} />}
      {progress === 68 && (
        <Information onNext={handleNext} handlePrevious={handlePrevious} />
      )}
      {progress === 102 && <Trail handlePrevious={handlePrevious} onNext={signUp} />}
    </SafeAreaView>
  );
};

export default SignUpCoach;
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
