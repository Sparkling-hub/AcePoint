import React from 'react';
import { Avatar, Circle, XStack, YStack } from 'tamagui';
import Colors from '@/constants/Colors';
import { Text } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { item } from '@/types/chatItem';

interface ChatBoxProps {
  item: item;
}

const ChatBox: React.FC<ChatBoxProps> = ({ item }) => {
  const { name, lastMessage, time } = item;
  return (
    <YStack gap={4}>
      <XStack
        justifyContent="space-between"
        paddingHorizontal={12}
        marginLeft={64}>
        <Text
          style={{ fontFamily: 'MontserratMedium' }}
          fontSize={16}
          color={Colors.secondary}
          lineHeight={19.5}>
          {name}
        </Text>
        <Text
          style={{ fontFamily: 'MontserratMedium' }}
          fontSize={14}
          lineHeight={17}
          color={Colors.secondary}>
          {time}
        </Text>
      </XStack>
      <XStack gap={20} alignItems="center">
        <Avatar circular borderWidth={2} borderColor={Colors.primary} size={47}>
          <Avatar.Image src={require('../../assets/images/user-pfp.png')} />
          <Avatar.Fallback bc={'#EFEFEF'} />
        </Avatar>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{ flex: 1 }}
          onPress={() =>
            router.push({
              pathname: '/chatRoom',
              params: item,
            })
          }>
          <XStack
            backgroundColor={Colors.lightSilver}
            borderRadius={10}
            paddingHorizontal={12}
            paddingVertical={10}
            alignItems="center"
            justifyContent="space-between">
            <Text
              style={{ fontFamily: 'MontserratMedium' }}
              color={Colors.secondary}
              lineHeight={14.5}
              fontSize={12}>
              {lastMessage}
            </Text>
            <Circle
              size={18}
              backgroundColor={Colors.secondary}
              alignItems="center"
              justifyContent="center">
              <Text
                style={{ fontFamily: 'MontserratMedium' }}
                fontSize={12}
                color={'white'}>
                1
              </Text>
            </Circle>
          </XStack>
        </TouchableOpacity>
      </XStack>
    </YStack>
  );
};

export default ChatBox;