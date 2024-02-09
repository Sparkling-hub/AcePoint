import { StyleSheet } from 'react-native';
import { Image, Text, View } from 'tamagui';

interface HistoryBoxProps {
  displayName: string;
  hours: number;
  date: string;
  location: string;
}

export default function HistoryBox(props: HistoryBoxProps) {
  const { hours, date, location, displayName } = props;
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.playerInfo}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/user-pfp.png')}
              style={styles.image}
            />
          </View>
          <View>
            <Text style={styles.displayNameText}>{displayName}</Text>
            <Text style={styles.text}>{location}</Text>
          </View>
        </View>
        <View style={styles.playerAchievementsContainer}>
          <View style={styles.hoursContainer}>
            <Text style={styles.numberText}>
              {hours} <Text style={styles.text}>h</Text>
            </Text>
          </View>
          <Text style={styles.text}>{date}</Text>
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  box: {
    width: '100%',
    height: 52,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    height: 52,
    width: 52,
    borderWidth: 2,
    borderColor: '#A9D05C',
    borderRadius: 47,
    marginRight: 10,
  },
  image: {
    height: 48,
    width: 48,
    resizeMode: 'contain',
    borderRadius: 45,
  },
  displayNameText: {
    fontFamily: 'MontserratBold',
    fontSize: 14,
    lineHeight: 17,
    color: '#3A4D6C',
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    lineHeight: 17,
    color: '#3A4D6C',
  },
  playerAchievementsContainer: {
    flexDirection: 'row',
  },
  hoursContainer: {
    width: 44,
    height: 19,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A9D05C',
    marginRight: 10,
  },
  numberText: {
    fontFamily: 'MontserratBold',
    fontSize: 14,
    lineHeight: 17,
    color: '#3A4D6C',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#8892A3',
    width: '100%',
  },
});
