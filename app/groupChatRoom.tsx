import GroupChatScreen from '@/screens/GroupChatScreen';

import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';

const GroupChatRoom = () => {
  const params = useLocalSearchParams();

  const roomId = params.roomId as string;
  const groupName = params.groupName as string;

  const userIds = Array.isArray(params.userIds)
    ? params.userIds
    : params.userIds?.split(',') || [];

  return (
    <SafeAreaView style={styles.container}>
      <GroupChatScreen
        roomId={roomId}
        groupName={groupName}
        userIds={userIds}
      />
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
