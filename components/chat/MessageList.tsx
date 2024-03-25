import React from 'react';
import { YStack } from 'tamagui';
import MessageItem from './MessageItem';
import { message } from '@/types/message';
import { ScrollView } from 'react-native';

interface MessageListProps {
  messages: message[];
  userId: string;
  messageListRef: React.RefObject<ScrollView>;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  userId,
  messageListRef,
}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} ref={messageListRef}>
      <YStack gap={10}>
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} userId={userId} />
        ))}
      </YStack>
    </ScrollView>
  );
};

export default MessageList;
