import Colors from '@/constants/Colors';
import React from 'react';
import { Avatar, Text, View, XStack, YStack } from 'tamagui';

interface MessageItemProps {
  message: any;
  userId: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, userId }) => {
  if (message.senderId === userId) {
    return (
      <YStack maxWidth={261} gap={3} alignSelf="flex-end">
        <Text
          style={{ fontFamily: 'MontserratMedium' }}
          fontSize={14}
          textAlign="left"
          lineHeight={17}
          color={Colors.secondary}>
          15:35
        </Text>
        <XStack gap={7}>
          <View
            backgroundColor={Colors.secondary}
            paddingHorizontal={10}
            paddingVertical={5}
            borderRadius={10}>
            <Text
              style={{ fontFamily: 'MontserratMedium' }}
              fontSize={14}
              lineHeight={17}
              color={'white'}>
              {message?.message}
            </Text>
          </View>
          <Avatar
            circular
            borderWidth={2}
            borderColor={Colors.secondary}
            size={28}>
            <Avatar.Image src={require('../assets/images/user-pfp.png')} />
            <Avatar.Fallback bc={Colors.secondary} />
          </Avatar>
        </XStack>
      </YStack>
    );
  } else {
    return (
      <YStack maxWidth={261} gap={3} alignSelf="flex-start">
        <Text
          style={{ fontFamily: 'MontserratMedium' }}
          fontSize={14}
          textAlign="right"
          lineHeight={17}
          color={Colors.secondary}>
          15:35
        </Text>
        <XStack gap={7}>
          <Avatar
            circular
            borderWidth={2}
            borderColor={Colors.primary}
            size={28}>
            <Avatar.Image src={require('../assets/images/user-pfp.png')} />
            <Avatar.Fallback bc={'#EFEFEF'} />
          </Avatar>
          <View
            backgroundColor={Colors.lightSilver}
            paddingHorizontal={10}
            paddingVertical={5}
            borderRadius={10}>
            <Text
              style={{ fontFamily: 'MontserratMedium' }}
              fontSize={14}
              lineHeight={17}
              color={Colors.secondary}>
              {message?.message}
            </Text>
          </View>
        </XStack>
      </YStack>
    );
  }
};

export default MessageItem;
