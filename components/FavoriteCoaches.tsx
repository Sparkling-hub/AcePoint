import { FlatList } from 'react-native';
import React from 'react';
import { Coach } from '@/model/coach';
import CoachBox from '@/components/CoachBox';
import { YStack } from 'tamagui';
import CoachSkeleton from '@/components/skeletons/CoachSkeleton';

interface FavoriteCoachesProps {
  favoriteCoaches: Coach[];
  loading: boolean;
}

const FavoriteCoaches: React.FC<FavoriteCoachesProps> = ({
  favoriteCoaches,
  loading,
}) => {
  if (loading) {
    return (
      <YStack gap={'$8'} paddingHorizontal={16}>
        <CoachSkeleton />
        <CoachSkeleton />
        <CoachSkeleton />
        <CoachSkeleton />
      </YStack>
    );
  }
  return (
    <YStack paddingHorizontal={16}>
      <FlatList
        data={favoriteCoaches}
        renderItem={({ item }) => (
          <CoachBox
            coachRef={item.id}
            name={item.displayName}
            rating={item.rating}
            level={item.level}
            age={42}
            image={item.image}
            followedPlayer={item.followedPlayer}
          />
        )}
      />
    </YStack>
  );
};

export default FavoriteCoaches;
