import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, XStack, YStack } from 'tamagui';
import PlayerPfp from './PlayerPfp';
import Colors from '@/constants/Colors';

interface PlayerCardProps {
  displayName: string;
  rating: number;
  hours: number;
}

export default function PlayerCard(props: PlayerCardProps) {
  const { displayName, rating, hours } = props;
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
        <YStack>
          <Text
            style={{ fontFamily: 'MontserratBold' }}
            color={Colors.secondary}
            fontSize={20}
            lineHeight={24}
            textAlign="center"
            marginTop={50}>
            {displayName}
          </Text>
          <XStack justifyContent="space-around" paddingTop={20}>
            <YStack>
              <Text style={styles.numberText}>{rating}</Text>
              <Text style={styles.text}>Rating</Text>
            </YStack>
            <YStack>
              <Text style={styles.numberText}>
                {hours} <Text style={styles.text}>hours</Text>
              </Text>
              <Text style={styles.text}>Time on court</Text>
            </YStack>
          </XStack>
        </YStack>
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  numberText: {
    fontFamily: 'MontserratExtraBold',
    fontSize: 14,
    lineHeight: 17,
    color: Colors.secondary,
    marginBottom: 5,
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    lineHeight: 17,
    color: Colors.secondary,
  },
});
