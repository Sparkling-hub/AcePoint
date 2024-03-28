import { ScrollView, Keyboard, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, Input, Text, XStack, YStack } from 'tamagui';
import {
  createRoom,
  cureentUser,
  getGroupMembers,
  sendMessage,
} from '@/api/chat-api';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Colors from '@/constants/Colors';
import MessageList from '@/components/chat/MessageList';
import ChatInput from '@/components/chat/ChatInput';

interface GroupChatScreenProps {
  userIds: string[];
  roomId: string;
  groupName: string;
}

const GroupChatScreen: React.FC<GroupChatScreenProps> = ({
  userIds,
  roomId,
  groupName,
}) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const textRef = React.useRef('');
  const inputRef = React.useRef<Input>(null);
  const messageListRef = React.useRef<ScrollView>(null);

  const userId = cureentUser();

  const createRoomIfNotExists = async () => {
    await createRoom(roomId, userIds);
  };

  const updateScrollView = () => {
    setTimeout(() => {
      messageListRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    createRoomIfNotExists();
    const docRef = doc(db, 'chat', roomId);
    const messagesRef = collection(docRef, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    let unsub = onSnapshot(q, (snap) => {
      let messages = snap.docs.map((doc) => {
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

  const fetchGroupMembers = async () => {
    const members = await getGroupMembers(userIds);
    setMembers(members);
  };

  useEffect(() => {
    fetchGroupMembers();
  }, []);

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      await sendMessage(roomId, message);
      if (inputRef) inputRef.current?.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <YStack flex={1} padding={16} justifyContent="space-between">
      <YStack flex={1} marginBottom={20}>
        <YStack
          gap={8}
          justifyContent="center"
          alignItems="center"
          marginBottom={16}>
          <Text
            style={{ fontFamily: 'MontserratMedium' }}
            fontSize={16}
            textAlign="center"
            textTransform="uppercase"
            lineHeight={19}
            color={Colors.secondary}>
            {groupName}
          </Text>
          <XStack gap={4}>
            {members?.map((member) => (
              <Avatar
                key={member.id}
                circular
                borderWidth={2}
                borderColor={Colors.primary}
                size={28}>
                <Avatar.Image
                  src={member.image ?? require('../assets/images/user-pfp.png')}
                />
                <Avatar.Fallback bc={'#EFEFEF'} />
              </Avatar>
            ))}
          </XStack>
        </YStack>

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

export default GroupChatScreen;
