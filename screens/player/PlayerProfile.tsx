import { StyleSheet, SafeAreaView, FlatList, StatusBar } from 'react-native';
import { View, Text, YStack, XStack } from 'tamagui';
import HistoryBox from '@/components/HistoryBox';
import PlayerCard from '@/components/PlayerCard';
import Colors from '@/constants/Colors';

export default function PlayerProfile() {
  const historyData = [
    {
      id: '1',
      displayName: 'Daniel Antone',
      location: 'Location 1',
      hours: 2,
      date: '10-10-2024',
    },
    {
      id: '2',
      displayName: 'Daniel Antone',
      location: 'Location 2',
      hours: 3,
      date: '11-10-2024',
    },
    {
      id: '3',
      displayName: 'Daniel Antone',
      location: 'Location 4',
      hours: 4,
      date: '12-10-2024',
    },
    {
      id: '4',
      displayName: 'Daniel Antone',
      location: 'Location 5',
      hours: 2,
      date: '13-10-2024',
    },

    // Add more items as needed
  ];
  return (
    <YStack flex={1} paddingTop={30}>
      <PlayerCard displayName="Daniel Antone" hours={25} rating={5.7} />
      <YStack flex={1} paddingHorizontal={25}>
        <XStack justifyContent="space-between" alignItems="center">
          <Text style={styles.text} color={Colors.primary}>
            History
          </Text>
          <Text style={styles.text} color={Colors.secondary}>
            Achievements
          </Text>
        </XStack>
        <FlatList
          data={historyData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoryBox
              displayName={item.displayName}
              location={item.location}
              hours={item.hours}
              date={item.date}
            />
          )}
        />
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    lineHeight: 20,
  },
});
