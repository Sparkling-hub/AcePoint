import React, { useEffect, useState } from 'react';
import ChatBox from '@/components/chat/ChatBox';
import { View, YStack } from 'tamagui';

import { ActivityIndicator, ScrollView } from 'react-native';
import {
  createGroupChatRoom,
  fetchGroupMembers,
  getAllUsers,
} from '@/api/chat-api';
import { item } from '@/types/chatItem';
import Colors from '@/constants/Colors';
import GroupChatBox from '@/components/chat/GroupChatBox';

const groups = [
  {
    id: '1',
    groupName: 'SUNDAY TRAINING GROUP',
    image: require('../assets/images/acepointicon.png'),
  },
];

const userIds = [
  'u7U9DYgyVtYT9XhbzAE7lzM9VXB3',
  'mmkK0tZKHAdSc8pSMonL3Zo1fNI3',
  'Pt45pfwYMbVOUkXDRHmAwQYcF8v2',
];

const ChatListScreen = () => {
  const [users, setUsers] = useState<item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchUsers = async () => {
    try {
      const users = await getAllUsers();
      setUsers(users);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createGroupChatRoomIfNotExists = async () => {
    await createGroupChatRoom(userIds);
  };

  const getGroupMembers = async () => {
    try {
      const members = await fetchGroupMembers(userIds);
      console.log(members);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    createGroupChatRoomIfNotExists();
    getGroupMembers();
    fetchUsers();
  }, []);

  return (
    <YStack flex={1} paddingTop={27} paddingHorizontal={22}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.secondary} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <YStack gap={16}>
            <YStack gap={16}>
              {users.map((item) => (
                <ChatBox item={item} key={item.id} />
              ))}
            </YStack>
            <YStack gap={16}>
              {groups.map((item) => (
                <GroupChatBox groupItem={item} key={item.id} />
              ))}
            </YStack>
          </YStack>
        </ScrollView>
      )}
    </YStack>
  );
};

export default ChatListScreen;
