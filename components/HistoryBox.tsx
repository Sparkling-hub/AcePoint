import { StyleSheet } from 'react-native';
import { Text, View, XStack, YStack } from 'tamagui';
import Colors from '@/constants/Colors';
import PorfilePicture from './PorfilePicture';

interface HistoryBoxProps {
  displayName: string;
  hours: number;
  date: string;
  location: string;
}

export default function HistoryBox(props: HistoryBoxProps) {
  const { hours, date, location, displayName } = props;
  return (
    <YStack marginTop={15}>
      <XStack
        width={'100%'}
        height={52}
        justifyContent="space-between"
        alignItems="center"
        marginBottom={10}>
        <XStack alignItems="center">
          <PorfilePicture
            marginRight={10}
            circular
            borderWidth={2}
            borderColor={Colors.primary}
            size="$5"
          />
          <YStack gap={'$1'}>
            <Text style={[styles.text, { fontFamily: 'MontserratBold' }]}>
              {displayName}
            </Text>
            <Text style={[styles.text, { fontFamily: 'Montserrat' }]}>
              {location}
            </Text>
          </YStack>
        </XStack>
        <XStack>
          <View
            width={44}
            height={19}
            borderRadius={5}
            justifyContent="center"
            alignItems="center"
            backgroundColor={Colors.primary}
            marginRight={10}>
            <Text style={[styles.text, { fontFamily: 'MontserratBold' }]}>
              {hours}{' '}
              <Text style={[styles.text, { fontFamily: 'Montserrat' }]}>h</Text>
            </Text>
          </View>
          <Text style={[styles.text, { fontFamily: 'Montserrat' }]}>
            {date}
          </Text>
        </XStack>
      </XStack>
      <View style={styles.line} />
    </YStack>
  );
}

const styles = StyleSheet.create({
  text: {
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
