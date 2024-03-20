import { Text, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import SubscriptionScreen from '@/screens/SubscriptionScreen';

const subscription = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SubscriptionScreen />
    </SafeAreaView>
  );
};

export default subscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
