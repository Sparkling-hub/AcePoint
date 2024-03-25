import { message } from '@/types/message';
import React from 'react';

import MessageBox from './MessageBox';

interface MessageItemProps {
  message: message;
  userId: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, userId }) => {
  if (message.senderId === userId) {
    return <MessageBox message={message} sent={true} />;
  } else {
    return <MessageBox message={message} />;
  }
};

export default MessageItem;
