import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import PlayerAccount from '@/screens/player/PlayerAccount';

export default function Account() {
  return (
    <SafeAreaView style={styles.container}>
      <PlayerAccount />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
