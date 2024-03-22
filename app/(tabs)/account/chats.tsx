import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import ChatListScreen from '@/screens/ChatListScreen';

const chats = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ChatListScreen />
    </SafeAreaView>
  );
};

export default chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
