import React, { useEffect, useMemo, useState } from 'react';
import { Avatar, Text, View, XStack, YStack } from 'tamagui';
import Colors from '@/constants/Colors';
import { Heart } from '@tamagui/lucide-icons';
import { renderStars } from '@/helpers/RatingsHelper';
import { favouriteCoach, unfavoriteCoach } from '@/api/player-api';
import { Pressable } from 'react-native';
import { auth } from '@/lib/firebase';
import fireToast from './toast/Toast';
import { useDispatch } from 'react-redux';
import { setCoachId, setCoachName, setLessons } from '@/store/slices/CoachSlice';
import { router } from 'expo-router';
import { getLessonsByCoachId } from '@/api/lesson-api';
import { getUpdatedLessonsForWeeklyView } from '@/services/lessons';

interface CoachBoxProps {
  readonly name?: string;
  readonly rating?: number;
  readonly level?: number;
  readonly age: number;
  readonly image?: string;
  readonly coachRef?: any;
  readonly followedPlayer?: string[];
}

const CoachBox: React.FC<CoachBoxProps> = ({
  name,
  rating,
  level,
  age,
  image,
  coachRef,
  followedPlayer,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (
      currentUser &&
      followedPlayer &&
      followedPlayer.includes(currentUser.uid)
    ) {
      setIsFavorite(true);
    }
  }, []);

  const handleFavoriteToggle = async () => {
    try {
      // Optimistically update UI
      setIsFavorite(!isFavorite);

      if (isFavorite) {
        await unfavoriteCoach(coachRef);
      } else {
        await favouriteCoach(coachRef);
        fireToast({
          message: 'Coach added to favourites',
          type: 'success',
        });
      }
    } catch (error) {
      // If request fails, roll back UI changes and display error message
      setIsFavorite(!isFavorite);
      console.error('Error toggling favorite:', error);
      // Handle error
    }
  };

  const stars = useMemo(() => {
    if (rating) {
      return renderStars(rating);
    }
    return null;
  }, [rating]);

  return (
    <YStack width={'100%'}>
      <XStack>
        <Avatar circular borderWidth={2} borderColor={Colors.primary} size={52}>
          <Avatar.Image
            src={image ?? require('../assets/images/user-pfp.png')}
          />
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
              onPress={async () => {
                const lessonsFromDB = await getLessonsByCoachId(coachRef)
                const lessons = getUpdatedLessonsForWeeklyView(lessonsFromDB)
                dispatch(setCoachName(name))
                dispatch(setCoachId(coachRef))
                dispatch(setLessons(lessons))
                router.push('/(tabs)/book/coach-availability')
              }}
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
            <Pressable onPress={handleFavoriteToggle}>
              <Heart
                size={20}
                color={Colors.secondary}
                marginTop={'$2'}
                fill={isFavorite ? Colors.secondary : 'none'}
              />
            </Pressable>
          </XStack>
          <XStack>{stars}</XStack>
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
