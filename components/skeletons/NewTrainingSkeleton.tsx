import React from 'react';
import { MotiView } from 'moti';
import { XStack, YStack } from 'tamagui';
import { Skeleton } from 'moti/skeleton';

export default function NewTrainingSkeleton() {
    return (
        <MotiView
            transition={{
                type: 'timing',
            }}
            animate={{ backgroundColor: '#ffffff' }}>
            <YStack gap={'$3'}>
                <YStack gap={'$3'}>
                    <Skeleton colorMode="light" width={'100%'} height={70} />
                    <Skeleton colorMode="light" width={'100%'} height={70} />
                </YStack>
                <XStack gap={'$3'}>
                    <YStack flex={2}>
                        <Skeleton colorMode="light" width={'100%'} height={70} />
                    </YStack>
                    <YStack flex={2}>
                        <Skeleton colorMode="light" width={'100%'} height={70} />
                    </YStack>
                </XStack>
                <XStack gap={'$3'}>
                    <YStack flex={2}>
                        <Skeleton colorMode="light" width={'100%'} height={70} />
                    </YStack>
                    <YStack flex={2}>
                        <Skeleton colorMode="light" width={'100%'} height={70} />
                    </YStack>
                </XStack>
                <YStack gap={'$3'}>
                    <Skeleton colorMode="light" width={'100%'} height={70} />
                    <Skeleton colorMode="light" width={'100%'} height={70} />
                </YStack>
                <YStack gap={'$3'}>
                    <Skeleton colorMode="light" width={'100%'} height={70} />
                    <Skeleton colorMode="light" width={'100%'} height={70} />
                </YStack>
            </YStack>
        </MotiView>
    );
}
