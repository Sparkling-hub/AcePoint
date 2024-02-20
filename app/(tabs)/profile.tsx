import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import PlayerProfile from '@/screens/player/PlayerProfile';
import CoachProfile from '@/screens/coach/CoachProfile';
import { USER_ROLE } from '@/constants/User';

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      {USER_ROLE === 'coach' ? <CoachProfile /> : <PlayerProfile />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
