import { View, Text } from 'react-native';
import React from 'react';

import { item } from '@/types/chatItem';

interface GroupChatScreenProps {
  groupItem: item;
}

const GroupChatScreen: React.FC<GroupChatScreenProps> = ({ groupItem }) => {
  const { id, image } = groupItem;
  return (
    <View>
      <Text>Group Chat</Text>
    </View>
  );
};

export default GroupChatScreen;
