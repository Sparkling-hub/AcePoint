import ChatInput from '@/components/chat/ChatInput';
import Colors from '@/constants/Colors';
import { item } from '@/types/chatItem';
import React from 'react';
import { Avatar, Text, View, XStack, YStack } from 'tamagui';

interface ChatScreenProps {
  item: item;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ item }) => {
  const { name } = item;
  return (
    <YStack flex={1} padding={16} justifyContent="space-between">
      <YStack>
        <Text
          style={{ fontFamily: 'MontserratMedium' }}
          fontSize={16}
          textAlign="center"
          marginBottom={16}
          lineHeight={19}
          color={Colors.secondary}>
          With: {name}
        </Text>
        <YStack gap={10}>
          {/* Example of recieved message */}
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
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fa
                </Text>
              </View>
            </XStack>
          </YStack>

          {/* Example of sent message */}
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
                  Pellentesque habitant morbi tristique senectus et netus et
                  malesuada fa
                </Text>
              </View>
              <Avatar
                circular
                borderWidth={2}
                borderColor={Colors.secondary}
                size={28}>
                {/* <Avatar.Image src={require('../assets/images/user-pfp.png')} /> */}
                <Avatar.Fallback bc={Colors.secondary} />
              </Avatar>
            </XStack>
          </YStack>
        </YStack>
      </YStack>

      <ChatInput placeholder="Type message..." />
    </YStack>
  );
};

export default ChatScreen;
