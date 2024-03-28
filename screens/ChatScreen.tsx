import { createRoom, cureentUser, sendMessage } from '@/api/chat-api';
import MessageList from '@/components/chat/MessageList';
import ChatInput from '@/components/chat/ChatInput';
import Colors from '@/constants/Colors';
import { db } from '@/lib/firebase';

import { getRoomId } from '@/utils/chatRoomUtil';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Input, Text, YStack } from 'tamagui';
import { ActivityIndicator, Keyboard, ScrollView } from 'react-native';

interface ChatScreenProps {
  id: string;
  displayName: string;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ id, displayName }) => {
  const textRef = React.useRef('');
  const inputRef = React.useRef<Input>(null);
  const messageListRef = React.useRef<ScrollView>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = cureentUser();

  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(userId, id);
    let userIds = [userId, id];
    await createRoom(roomId, userIds);
  };

  useEffect(() => {
    createRoomIfNotExists();
    let roomId = getRoomId(userId, id);

    const docRef = doc(db, 'chat', roomId);
    const messagesRef = collection(docRef, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    let unsub = onSnapshot(q, (querySnapshot) => {
      let messages = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...messages]);
      setLoading(false);
    });

    const KeyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => updateScrollView()
    );

    return () => {
      unsub();
      KeyboardDidShowListener.remove();
    };
  }, []);

  const updateScrollView = () => {
    setTimeout(() => {
      messageListRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(userId, id);
      await sendMessage(roomId, message);
      if (inputRef) inputRef.current?.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <YStack flex={1} padding={16} justifyContent="space-between">
      <YStack flex={1} marginBottom={20}>
        <Text
          style={{ fontFamily: 'MontserratMedium' }}
          fontSize={16}
          textAlign="center"
          marginBottom={16}
          lineHeight={19}
          color={Colors.secondary}>
          With:{' '}
          <Text
            style={{ fontFamily: 'MontserratMedium' }}
            color={Colors.secondary}
            textTransform="uppercase">
            {displayName}
          </Text>
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.secondary} />
        ) : (
          <MessageList
            messages={messages}
            userId={userId}
            messageListRef={messageListRef}
          />
        )}
      </YStack>

      <ChatInput
        inputRef={inputRef}
        placeholder="Type message..."
        onChangeText={(value) => (textRef.current = value)}
        onSend={handleSendMessage}
      />
    </YStack>
  );
};

export default ChatScreen;
