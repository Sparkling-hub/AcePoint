import React, { useEffect, useState } from 'react';
import ChatBox from '@/components/chat/ChatBox';
import { View, YStack } from 'tamagui';

import { ActivityIndicator, FlatList } from 'react-native';
import { getAllUsers } from '@/api/chat-api';
import { item } from '@/types/chatItem';
import Colors from '@/constants/Colors';

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

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
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <YStack flex={1} paddingTop={27} paddingHorizontal={22}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.secondary} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={Spacer}
          renderItem={({ item }) => <ChatBox item={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </YStack>
  );
};

export default ChatListScreen;
