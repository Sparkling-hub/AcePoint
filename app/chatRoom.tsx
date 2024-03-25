import ChatScreen from '@/screens/ChatScreen';
import { item } from '@/types/chatItem';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';

const ChatRoom = () => {
  const item = useLocalSearchParams<item>();

  return (
    <SafeAreaView style={styles.container}>
      <ChatScreen item={item} />
    </SafeAreaView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
