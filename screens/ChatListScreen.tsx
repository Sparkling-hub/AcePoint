import React, { useEffect } from 'react';
import ChatBox from '@/components/chat/ChatBox';
import { View } from 'tamagui';

import { useMessages } from '@/hooks/useMessages';
import { FlatList } from 'react-native';

const chatListData = [
  {
    userId: 1,
    name: 'John Doe',
    lastMessage:
      'Lorem ipsum dolor sit amet, onsect adipiscing elit pellentesque tempor.',
    time: '12:00',
  },
  {
    userId: 2,
    name: 'Jane Doe',
    lastMessage:
      'Lorem ipsum dolor sit amet, onsect adipiscing elit pellentesque tempor.',
    time: '12:01',
  },
  {
    userId: 3,
    name: 'John Doe',
    lastMessage:
      'Lorem ipsum dolor sit amet, onsect adipiscing elit pellentesque tempor.',
    time: '12:02',
  },
  {
    userId: 4,
    name: 'Jane Doe',
    lastMessage:
      'Lorem ipsum dolor sit amet, onsect adipiscing elit pellentesque tempor.',
    time: '12:03',
  },
  {
    userId: 5,
    name: 'John Doe',
    lastMessage:
      'Lorem ipsum dolor sit amet, onsect adipiscing elit pellentesque tempor.',
    time: '12:04',
  },
  {
    userId: 6,
    name: 'Jane Doe',
    lastMessage:
      'Lorem ipsum dolor sit amet, onsect adipiscing elit pellentesque tempor.',
    time: '12:05',
  },
];

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const ChatListScreen = () => {
  // const messages = useMessages();
  // console.log(messages);
  return (
    <View flex={1} paddingTop={27} paddingHorizontal={22}>
      <FlatList
        data={chatListData}
        keyExtractor={(item) => item.userId.toString()}
        ItemSeparatorComponent={Spacer}
        renderItem={({ item }) => <ChatBox item={item} />}
      />
    </View>
  );
};

export default ChatListScreen;
