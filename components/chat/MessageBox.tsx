import React from 'react';
import { message } from '@/types/message';
import { Avatar, Text, View, XStack, YStack } from 'tamagui';
import Colors from '@/constants/Colors';
import moment from 'moment';
import 'moment/locale/en-gb';

interface MessageBoxProps {
  message: message;
  sent?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, sent = false }) => {
  const { createdAt, image } = message;
  const timestampInMillis =
    createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000;

  // Convert to Moment.js object
  const momentDate = moment(timestampInMillis);
  momentDate.locale('en-gb');

  // Format the date
  const formattedDate = momentDate.format('LT');

  return (
    <YStack maxWidth={261} gap={3} alignSelf={sent ? 'flex-end' : 'flex-start'}>
      <Text
        style={{ fontFamily: 'MontserratMedium' }}
        fontSize={14}
        textAlign={sent ? 'left' : 'right'}
        lineHeight={17}
        color={Colors.secondary}>
        {formattedDate}
      </Text>
      <XStack gap={7}>
        {!sent && (
          <Avatar
            circular
            borderWidth={2}
            borderColor={Colors.primary}
            size={28}>
            <Avatar.Image src={require('../../assets/images/user-pfp.png')} />
            <Avatar.Fallback bc={'#EFEFEF'} />
          </Avatar>
        )}
        <View
          backgroundColor={sent ? Colors.secondary : Colors.lightSilver}
          paddingHorizontal={10}
          paddingVertical={5}
          borderRadius={10}>
          <Text
            style={{ fontFamily: 'MontserratMedium' }}
            fontSize={14}
            lineHeight={17}
            color={sent ? 'white' : Colors.secondary}>
            {message?.message}
          </Text>
        </View>
        {sent && (
          <Avatar
            circular
            borderWidth={2}
            borderColor={Colors.secondary}
            size={28}>
            <Avatar.Image src={require('../../assets/images/user-pfp.png')} />
            <Avatar.Fallback bc={Colors.secondary} />
          </Avatar>
        )}
      </XStack>
    </YStack>
  );
};

export default MessageBox;
