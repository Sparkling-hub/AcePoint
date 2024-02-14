import { StyleSheet } from 'react-native';
import { Text, View } from 'tamagui';
import PlayerPfp from './PlayerPfp';
import Colors from '@/constants/Colors';

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
          <PlayerPfp
            imageContainerStyle={{ height: 52, width: 52, marginRight: 10 }}
          />
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
  displayNameText: {
    fontFamily: 'MontserratBold',
    fontSize: 14,
    lineHeight: 17,
    color: Colors.secondary,
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    lineHeight: 17,
    color: Colors.secondary,
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
    backgroundColor: Colors.primary,
    marginRight: 10,
  },
  numberText: {
    fontFamily: 'MontserratBold',
    fontSize: 14,
    lineHeight: 17,
    color: Colors.secondary,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#8892A3',
    width: '100%',
  },
});
