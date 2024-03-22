import React, { useEffect } from 'react';
import ChatBox from '@/components/chat/ChatBox';
import { View } from 'tamagui';

import { useMessages } from '@/hooks/useMessages';

const ChatListScreen = () => {
  const messages = useMessages();
  console.log(messages);
  return (
    <View flex={1} paddingTop={27} paddingHorizontal={16}>
      <ChatBox />
    </View>
  );
};

export default ChatListScreen;
