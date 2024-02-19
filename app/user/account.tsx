import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';

import AccountScreen from '@/screens/AccountScreen';

export default function Account() {
  return (
    <SafeAreaView style={styles.container}>
      <AccountScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
