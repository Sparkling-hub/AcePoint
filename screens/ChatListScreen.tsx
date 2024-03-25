import React, { useEffect, useState } from 'react';
import ChatBox from '@/components/chat/ChatBox';
import { View } from 'tamagui';

import { FlatList } from 'react-native';
import { getAllUsers } from '@/api/chat-api';
import { item } from '@/types/chatItem';

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const ChatListScreen = () => {
  const [users, setUsers] = useState<item[]>([]);
  const fetchUsers = async () => {
    const users = await getAllUsers();
    setUsers(users);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <View flex={1} paddingTop={27} paddingHorizontal={22}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Spacer}
        renderItem={({ item }) => <ChatBox item={item} />}
      />
    </View>
  );
};

export default ChatListScreen;
