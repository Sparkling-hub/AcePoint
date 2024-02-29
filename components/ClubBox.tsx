import Colors from '@/constants/Colors';
import { renderStars } from '@/helpers/RatingsHelper';

import React from 'react';
import { Avatar, Text, XStack, YStack } from 'tamagui';

interface ClubBoxProps {
  readonly name: string;
  readonly membership: string;
  readonly rating: number;
}

const ClubBox: React.FC<ClubBoxProps> = ({ name, membership, rating }) => {
  return (
    <XStack alignItems="center" width={'100%'}>
      <Avatar circular borderWidth={3} borderColor={Colors.primary} size={67}>
        {/* <Avatar.Image src={image} /> */}
        <Avatar.Fallback bc={Colors.secondary} />
      </Avatar>
      <XStack alignItems="center" justifyContent="space-between" flex={1}>
        <YStack marginLeft={7} gap={1}>
          <Text
            style={{ fontFamily: 'MontserratBold' }}
            fontSize={16}
            color={Colors.secondary}
            lineHeight={19}>
            {name}
          </Text>
          <Text
            style={{ fontFamily: 'Montserrat' }}
            fontSize={14}
            lineHeight={17}
            color={Colors.secondary}>
            Need membership:{' '}
            <Text
              style={{ fontFamily: 'MontserratBold' }}
              color={Colors.secondary}>
              {membership}
            </Text>
          </Text>
        </YStack>
        <YStack gap={5}>
          <XStack>{renderStars(rating)}</XStack>
          <Text
            style={{ fontFamily: 'Montserrat' }}
            fontSize={14}
            lineHeight={17}
            color={Colors.secondary}>
            Rating:{' '}
            <Text
              style={{ fontFamily: 'MontserratBold' }}
              color={Colors.secondary}>
              {rating}
            </Text>
          </Text>
        </YStack>
      </XStack>
    </XStack>
  );
};

export default ClubBox;
