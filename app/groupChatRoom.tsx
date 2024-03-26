import GroupChatScreen from '@/screens/GroupChatScreen';
import { item } from '@/types/chatItem';

import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';

const GroupChatRoom = () => {
  const item = useLocalSearchParams<item>();
  return (
    <SafeAreaView style={styles.container}>
      <GroupChatScreen groupItem={item} />
    </SafeAreaView>
  );
};

export default GroupChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
