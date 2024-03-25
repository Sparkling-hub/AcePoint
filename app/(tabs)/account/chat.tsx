import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import ChatListScreen from '@/screens/ChatListScreen';

const chat = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ChatListScreen />
    </SafeAreaView>
  );
};

export default chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
