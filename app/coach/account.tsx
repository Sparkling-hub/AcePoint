import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';

import CoachAccount from '@/screens/coach/CoachAccount';

export default function Account() {
  return (
    <SafeAreaView style={styles.container}>
      <CoachAccount />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
