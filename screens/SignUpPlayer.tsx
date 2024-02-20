import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Progress } from 'tamagui';
import SignUp from './player/signUp';
import Levling from './player/Levling';
import Question from './player/Question';

const SignUpPlayer = () => {
  const [progress, setProgress] = useState(34);
  const handleNext = () => setProgress(progress + 34);
  return (
    <SafeAreaView style={styles.container}>
      <Progress value={progress} style={styles.progress}>
      </Progress>
      {progress === 34 && <SignUp onNext={handleNext} />}
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
