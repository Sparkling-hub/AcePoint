import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import PlayerAccount from '@/screens/player/PlayerAccount';

export default function Info() {
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
    paddingTop: StatusBar.currentHeight,
  },
});
