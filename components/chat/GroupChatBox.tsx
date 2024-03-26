import Colors from '@/constants/Colors';
import { item } from '@/types/chatItem';

import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar, Circle, Text, XStack, YStack } from 'tamagui';

interface GroupChatBoxProps {
  groupItem: item;
}

const GroupChatBox: React.FC<GroupChatBoxProps> = ({ groupItem }) => {
  const { id, image } = groupItem;
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
          Group Chat
        </Text>
        <Text
          style={{ fontFamily: 'MontserratMedium' }}
          fontSize={14}
          lineHeight={17}
          color={Colors.secondary}>
          12:00
        </Text>
      </XStack>
      <XStack gap={20} alignItems="center">
        <Avatar circular borderWidth={2} borderColor={Colors.primary} size={47}>
          <Avatar.Image
            src={image ?? require('../../assets/images/user-pfp.png')}
          />
          <Avatar.Fallback bc={'#EFEFEF'} />
        </Avatar>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{ flex: 1 }}
          onPress={() =>
            router.push({
              pathname: '/groupChatRoom',
              params: groupItem,
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
      </XStack>
    </YStack>
  );
};

export default GroupChatBox;
