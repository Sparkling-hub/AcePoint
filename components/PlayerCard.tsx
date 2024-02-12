import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'tamagui';
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
    <View style={styles.container}>
      <View style={styles.card}>
        <PlayerPfp
          imageContainerStyle={{
            position: 'absolute',
            top: -47,
            alignSelf: 'center',
          }}
        />
        <View>
          <Text style={styles.displayNameText}>{displayName}</Text>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.numberText}>{rating}</Text>
              <Text style={styles.text}>Rating</Text>
            </View>
            <View>
              <Text style={styles.numberText}>
                {hours} <Text style={styles.text}>hours</Text>
              </Text>
              <Text style={styles.text}>Time on court</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 150,
    marginBottom: 35,
  },
  card: {
    width: 362,
    height: 162,
    backgroundColor: Colors.lightSilver,
    borderRadius: 8,
    justifyContent: 'center',
  },
  displayNameText: {
    fontFamily: 'MontserratBold',
    fontSize: 20,
    lineHeight: 24,
    color: Colors.secondary,
    textAlign: 'center',
    marginTop: 50,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
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
