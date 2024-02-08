import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text, View } from 'tamagui';

interface PlayerCardProps {
  displayName: string;
  rating: number;
  hours: number;
}

export default function PlayerCard(props: PlayerCardProps) {
  const { displayName, rating, hours } = props;
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/user-pfp.png')}
            style={styles.image}
          />
        </View>
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
    marginBottom: 35,
  },
  box: {
    width: 362,
    height: 162,
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'absolute',
    top: -47,
    alignSelf: 'center',
    width: 94,
    height: 94,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
    borderWidth: 2,
    borderColor: '#A9D05C',
    borderRadius: 47,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    borderRadius: 45,
  },
  displayNameText: {
    fontFamily: 'MontserratBold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    color: '#3A4D6C',
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
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 14,
    lineHeight: 17,
    color: '#3A4D6C',
    marginBottom: 5,
  },
  text: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    color: '#3A4D6C',
  },
});
