import Colors from '@/constants/Colors';
import { Star } from '@tamagui/lucide-icons';
import React from 'react';
import { Avatar, Text, XStack, YStack } from 'tamagui';

interface clubBoxProps {
  readonly name: string;
  readonly membership: string;
  readonly rating: number;
}

const ClubBox: React.FC<clubBoxProps> = ({ name, membership, rating }) => {
  // Function to generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const filledStars = Math.floor(rating); // Number of filled stars
    const remaining = 5 - filledStars; // Remaining stars to be empty

    // Filled stars
    for (let i = 0; i < filledStars; i++) {
      stars.push(<Star key={i} size={12} color={'#FFB84E'} fill={'#FFB84E'} />);
    }

    // Empty stars
    for (let i = 0; i < remaining; i++) {
      stars.push(<Star key={i + filledStars} size={12} color={'#FFB84E'} />);
    }

    return stars;
  };

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
          <XStack>{renderStars()}</XStack>
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
