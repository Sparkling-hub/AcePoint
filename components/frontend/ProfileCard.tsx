import React from 'react';

import { Card, Text } from 'tamagui';

import Colors from '@/constants/Colors';
import PorfilePicture from '../backend/PorfilePicture';
import { StyleSheet } from 'react-native';

interface ProfileCardProps {
  readonly children: React.ReactNode;
  readonly rating?: number;
}

export default function ProfileCard(props: ProfileCardProps) {
  const { children, rating } = props;
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
        {rating && (
          <Text
            position="absolute"
            top={-28}
            right={28}
            alignSelf="center"
            style={[{ fontFamily: 'MontserratExtraBold' }, styles.text]}>
            {rating}{' '}
            <Text style={[{ fontFamily: 'Montserrat' }, styles.text]}>
              Rating
            </Text>
          </Text>
        )}
      </Card.Header>
      {children}
      <Card.Footer />
      <Card.Background />
    </Card>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Colors.secondary,
    fontSize: 16,
    lineHeight: 19,
  },
});
