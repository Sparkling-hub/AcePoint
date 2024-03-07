import React from 'react';
import { MotiView } from 'moti';
import { XStack, YStack } from 'tamagui';
import { Skeleton } from 'moti/skeleton';
import { USER_ROLE } from '@/constants/User';

export default function EditProfileSkeleton() {
  return (
    <MotiView
      transition={{
        type: 'timing',
      }}
      animate={{ backgroundColor: '#ffffff' }}>
      <YStack alignItems="center" marginBottom={50}>
        <Skeleton radius="round" colorMode="light" height={94} width={94} />
      </YStack>
      <YStack gap={'$3'}>
        <YStack gap={'$3'}>
          <Skeleton colorMode="light" width={'100%'} height={70} />
          <Skeleton colorMode="light" width={'100%'} height={70} />
        </YStack>
        <XStack gap={'$3'}>
          <YStack flex={1}>
            <Skeleton colorMode="light" width={'100%'} height={70} />
          </YStack>
          <YStack flex={2}>
            <Skeleton colorMode="light" width={'100%'} height={70} />
          </YStack>
        </XStack>
        <YStack gap={'$3'}>
          <Skeleton colorMode="light" width={'100%'} height={70} />
          <Skeleton colorMode="light" width={'100%'} height={70} />
          {USER_ROLE === 'coach' && (
            <Skeleton colorMode="light" width={'100%'} height={70} />
          )}
        </YStack>
      </YStack>
    </MotiView>
  );
}
