import { StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';

import EditPlayerProfile from '@/screens/player/EditPlayerProfile';

export default function EditProfile() {
  return (
    <SafeAreaView style={styles.container}>
      <EditPlayerProfile />
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
