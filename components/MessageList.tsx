import React from 'react';
import { ScrollView, YStack } from 'tamagui';
import MessageItem from './MessageItem';

interface MessageListProps {
  messages: any[];
  userId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, userId }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack gap={10}>
        {messages.map((message, index) => (
          <MessageItem key={index} message={message} userId={userId} />
        ))}
      </YStack>
    </ScrollView>
  );
};

export default MessageList;
