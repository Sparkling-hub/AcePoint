import React from 'react';

import { YStack } from 'tamagui';
import PlayerPfp from './PlayerPfp';
import Colors from '@/constants/Colors';

interface PlayerCardProps {
  children: React.ReactNode;
}

export default function PlayerCard(props: PlayerCardProps) {
  const { children } = props;
  return (
    <YStack marginBottom={35} alignItems="center">
      <YStack
        width={362}
        height={162}
        borderRadius={8}
        justifyContent="center"
        backgroundColor={Colors.lightSilver}>
        <PlayerPfp
          imageContainerStyle={{
            position: 'absolute',
            top: -47,
            alignSelf: 'center',
          }}
        />
        <YStack>{children}</YStack>
      </YStack>
    </YStack>
  );
}
