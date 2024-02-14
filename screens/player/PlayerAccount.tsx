import { StyleSheet } from 'react-native';
import { Text, View, YStack } from 'tamagui';

import { ChevronRight } from '@tamagui/lucide-icons';
import PlayerPfp from '@/components/PlayerPfp';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';

export default function PlayerAccount() {
  return (
    <YStack flex={1}>
      <YStack alignItems="center" marginBottom={30}>
        <PlayerPfp imageContainerStyle={{ marginBottom: 20 }} />
        <Text
          style={{ fontFamily: 'MontserratBold' }}
          fontSize={20}
          lineHeight={24}
          color={Colors.secondary}
          textAlign="center">
          Daniel Antone
        </Text>
      </YStack>
      <YStack gap={20} paddingHorizontal={15} marginBottom={40}>
        <YStack>
          <Text style={styles.text}>Your Account</Text>
          <YStack gap={15}>
            <CustomButton
              title="Edit profile"
              onPress={() =>
                router.push({
                  pathname: '/player/edit-profile',
                })
              }
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              icon={<ChevronRight size="$2" color={Colors.secondary} />}
            />
            <CustomButton
              title="Settings"
              onPress={() => {}}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              icon={<ChevronRight size="$2" color={Colors.secondary} />}
            />
          </YStack>
        </YStack>
        <YStack>
          <Text style={styles.text}>Support</Text>
          <YStack>
            <CustomButton
              title="Help"
              onPress={() => {}}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              icon={<ChevronRight size="$2" color={Colors.secondary} />}
            />
          </YStack>
        </YStack>
        <YStack>
          <Text style={styles.text}>Legal</Text>
          <YStack>
            <CustomButton
              title="Privacy"
              onPress={() => {}}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              icon={<ChevronRight size="$2" color={Colors.secondary} />}
            />
          </YStack>
        </YStack>
      </YStack>
      <YStack alignItems="center" marginBottom={20} paddingHorizontal={15}>
        <CustomButton
          title="Logout"
          onPress={() => {
            console.log('pressed');
          }}
        />
      </YStack>
    </YStack>
  );
}

const styles = StyleSheet.create({
  displayNameText: {
    fontFamily: 'MontserratBold',
    fontSize: 20,
    lineHeight: 24,
    color: Colors.secondary,
    textAlign: 'center',
  },

  text: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.secondary,
    paddingLeft: 20,
    marginBottom: 10,
  },

  button: {
    backgroundColor: Colors.primary,
    height: 52,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 16,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontFamily: 'MontserratMedium',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.secondary,
  },
});
