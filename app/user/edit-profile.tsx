import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import EditProfileScreen from '@/screens/EditProfileScreen';

export default function EditProfile() {
  return (
    <SafeAreaView style={styles.container}>
      <EditProfileScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
