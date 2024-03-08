import React from 'react';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { XStack, YStack } from 'tamagui';

const CoachSkeleton = () => {
  return (
    <MotiView
      transition={{
        type: 'timing',
      }}
      animate={{ backgroundColor: '#ffffff' }}>
      <XStack gap={'$3'} alignItems="center">
        <Skeleton colorMode="light" radius="round" height={52} width={52} />
        <YStack gap={'$3'}>
          <Skeleton colorMode="light" width={100} height={10} />
          <Skeleton colorMode="light" width={250} height={10} />
          <Skeleton colorMode="light" width={250} height={10} />
        </YStack>
      </XStack>
    </MotiView>
  );
};

export default CoachSkeleton;
