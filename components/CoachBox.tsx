import React from 'react';
import { Avatar, Text, View, XStack, YStack } from 'tamagui';
import Colors from '@/constants/Colors';
import { Heart } from '@tamagui/lucide-icons';
import { renderStars } from '@/helpers/RatingsHelper';

interface CoachBoxProps {
  readonly name: string;
  readonly rating: number;
  readonly level: number;
  readonly age: number;
}

const CoachBox: React.FC<CoachBoxProps> = ({ name, rating, level, age }) => {
  return (
    <YStack width={'100%'}>
      <XStack>
        <Avatar circular borderWidth={2} borderColor={Colors.primary} size={52}>
          <Avatar.Image src={require('../assets/images/user-pfp.png')} />
          <Avatar.Fallback bc={'#EFEFEF'} />
        </Avatar>
        <YStack marginLeft={8} flex={1} justifyContent="space-between">
          <XStack justifyContent="space-between">
            <Text
              style={{ fontFamily: 'MontserratBold' }}
              color={Colors.secondary}
              fontSize={14}
              lineHeight={17}>
              {name}
            </Text>
            <Text
              style={{ fontFamily: 'MontserratMedium' }}
              color={Colors.primary}
              fontSize={14}
              textDecorationLine="underline"
              lineHeight={17}>
              Show Availability
            </Text>
          </XStack>
          <XStack alignItems="center" justifyContent="space-between">
            <XStack>
              <Text
                style={{ fontFamily: 'Montserrat' }}
                fontSize={14}
                lineHeight={17}
                color={Colors.primary}>
                Ratings:{' '}
                <Text
                  style={{ fontFamily: 'MontserratBold' }}
                  color={Colors.secondary}>
                  {rating}
                </Text>
              </Text>
              <Text
                style={{ fontFamily: 'Montserrat' }}
                fontSize={14}
                marginHorizontal={8}
                color={Colors.secondary}>
                /
              </Text>
              <Text
                style={{ fontFamily: 'Montserrat' }}
                fontSize={14}
                lineHeight={17}
                color={Colors.secondary}>
                Level:{' '}
                <Text
                  style={{ fontFamily: 'MontserratBold' }}
                  color={Colors.secondary}>
                  {level}
                </Text>
              </Text>
              <Text
                style={{ fontFamily: 'Montserrat' }}
                fontSize={14}
                marginHorizontal={8}
                color={Colors.secondary}>
                /
              </Text>
              <Text
                style={{ fontFamily: 'Montserrat' }}
                fontSize={14}
                lineHeight={17}
                color={Colors.secondary}>
                Age:{' '}
                <Text
                  style={{ fontFamily: 'MontserratBold' }}
                  color={Colors.secondary}>
                  {age}
                </Text>
              </Text>
            </XStack>
            <Heart
              size={20}
              color={Colors.secondary}
              fill={Colors.secondary}
              marginTop={'$2'}
            />
          </XStack>
          <XStack>{renderStars(rating)}</XStack>
        </YStack>
      </XStack>
      <View
        width={'100%'}
        borderBottomWidth={1}
        borderBottomColor={'#8892A3'}
        marginVertical={12}
      />
    </YStack>
  );
};

export default CoachBox;
