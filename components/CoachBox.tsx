import { View, Text } from 'react-native';
import React from 'react';
import { Avatar, XStack } from 'tamagui';
import Colors from '@/constants/Colors';

const CoachBox = () => {
  return (
    <XStack>
      <Avatar circular borderWidth={2} borderColor={Colors.primary} size={52}>
        <Avatar.Image src={require('../assets/images/user-pfp.png')} />
        <Avatar.Fallback bc={'#EFEFEF'} />
      </Avatar>
      <XStack></XStack>
    </XStack>
  );
};

export default CoachBox;
