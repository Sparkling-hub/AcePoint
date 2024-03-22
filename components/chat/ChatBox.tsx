import React from 'react';
import { Avatar, Circle, XStack, YStack } from 'tamagui';
import Colors from '@/constants/Colors';
import { Text } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const ChatBox = () => {
  return (
    <XStack gap={20} alignItems="flex-end">
      <Avatar circular borderWidth={2} borderColor={Colors.primary} size={47}>
        <Avatar.Image src={require('../../assets/images/user-pfp.png')} />
        <Avatar.Fallback bc={'#EFEFEF'} />
      </Avatar>
      <YStack flex={1} gap={4}>
        <XStack justifyContent="space-between" paddingHorizontal={12}>
          <Text
            style={{ fontFamily: 'MontserratMedium' }}
            fontSize={16}
            color={Colors.secondary}
            lineHeight={19.5}>
            ADI DANIEL
          </Text>
          <Text
            style={{ fontFamily: 'MontserratMedium' }}
            fontSize={14}
            lineHeight={17}
            color={Colors.secondary}>
            15:35
          </Text>
        </XStack>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            router.push({
              pathname: '/chats/[id]',
              params: { id: 1 },
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
              Lorem ipsum dolor sit amet, onsect adipiscing elit pellentesque
              tempor.
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
      </YStack>
    </XStack>
  );
};

export default ChatBox;
