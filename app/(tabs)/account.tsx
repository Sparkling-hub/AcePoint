import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import PlayerProfile from '@/screens/player/PlayerProfile';

export default function Account() {
  return (
    <SafeAreaView style={styles.container}>
      <PlayerProfile />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
