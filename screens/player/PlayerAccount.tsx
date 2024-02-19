import { Platform, StyleSheet } from 'react-native';
import { Text, YStack } from 'tamagui';

import { ChevronRight } from '@tamagui/lucide-icons';

import Colors from '@/constants/Colors';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import PorfilePicture from '@/components/PorfilePicture';

export default function PlayerAccount() {
  const [username, setUsername] = useState('');
  const getUserName = async () => {
    const name = await ReactNativeAsyncStorage.getItem('username');
    if (name) return setUsername(name);
  };
  useEffect(() => {
    getUserName();
  }, []);
  return (
    <YStack flex={1} paddingTop={Platform.OS === 'ios' ? 90 : 30}>
      <YStack alignItems="center" marginBottom={30}>
        <PorfilePicture
          marginBottom={20}
          circular
          borderWidth={2}
          borderColor={Colors.primary}
          size="$9"
        />
        <Text
          style={{ fontFamily: 'MontserratBold' }}
          fontSize={20}
          lineHeight={24}
          color={Colors.secondary}
          textAlign="center">
          {username ? username : 'Daniel Antone'}
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
