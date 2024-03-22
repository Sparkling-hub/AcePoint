import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import PlayerProfile from '@/screens/player/PlayerProfile';
import CoachProfile from '@/screens/coach/CoachProfile';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function Profile() {
  const userRole = useSelector((state: RootState) => state.userRole);
  const userRoleValue = userRole.userRole;
  return (
    <SafeAreaView style={styles.container}>
      {userRoleValue === 'Coach' ? <CoachProfile /> : <PlayerProfile />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
