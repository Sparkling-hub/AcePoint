import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';

import AccountScreen from '@/screens/AccountScreen';

export default function Account({ testID }: {
  readonly testID: string;
}) {
  return (
    <SafeAreaView style={styles.container} testID={ testID }>
      <AccountScreen testID={ testID }></AccountScreen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
