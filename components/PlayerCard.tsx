import React from 'react';

import { Card } from 'tamagui';

import Colors from '@/constants/Colors';
import PorfilePicture from './PorfilePicture';

interface PlayerCardProps {
  children: React.ReactNode;
}

export default function PlayerCard(props: PlayerCardProps) {
  const { children } = props;
  return (
    <Card
      marginBottom={35}
      width={'100%'}
      height={162}
      borderRadius={8}
      backgroundColor={Colors.lightSilver}>
      <Card.Header>
        <PorfilePicture
          circular
          borderWidth={2}
          borderColor={Colors.primary}
          size="$9"
          position="absolute"
          top={-47}
          alignSelf="center"
        />
      </Card.Header>
      {children}
      <Card.Footer />
      <Card.Background />
    </Card>
  );
}
