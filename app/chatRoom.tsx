import ChatScreen from '@/screens/ChatScreen';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';

const ChatRoom = () => {
  const params = useLocalSearchParams();
  const id = params.id as string;
  const displayName = params.displayName as string;

  return (
    <SafeAreaView style={styles.container}>
      <ChatScreen id={id} displayName={displayName} />
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
