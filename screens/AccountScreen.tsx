import { Platform, StyleSheet } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';

import { ChevronRight } from '@tamagui/lucide-icons';

import Colors from '@/constants/Colors';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import PorfilePicture from '@/components/PorfilePicture';
import { USER_ROLE } from '@/constants/User';

export default function AccountScreen() {
  const [username, setUsername] = useState('');
  const getUserName = async () => {
    const name = await ReactNativeAsyncStorage.getItem('username');
    if (name) return setUsername(name);
  };
  useEffect(() => {
    getUserName();
  }, []);

  const paddingTop =
    USER_ROLE === 'coach' ? 0 : Platform.OS === 'ios' ? 90 : 30;

  return (
    <YStack flex={1} paddingTop={paddingTop}>
      {USER_ROLE === 'player' ? (
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
            {username ?? 'Daniel Antone'}
          </Text>
        </YStack>
      ) : (
        <XStack
          justifyContent="space-between"
          alignItems="center"
          marginBottom={26}
          paddingHorizontal={20}>
          <YStack alignItems="flex-start" gap={'$1.5'}>
            <Text
              style={{ fontFamily: 'MontserratBold' }}
              fontSize={20}
              lineHeight={24}
              color={Colors.secondary}>
              {username ?? 'Daniel Antone'}
            </Text>
            <Text
              style={{ fontFamily: 'Montserrat' }}
              fontSize={12}
              lineHeight={14}
              color={Colors.secondary}>
              Subscribed since 10/10/2001
            </Text>
          </YStack>
          <PorfilePicture
            marginBottom={20}
            circular
            borderWidth={2}
            borderColor={Colors.primary}
            size="$9"
          />
        </XStack>
      )}

      <YStack gap={20} paddingHorizontal={15} marginBottom={40}>
        <YStack>
          <Text style={styles.text}>Your Account</Text>
          <YStack gap={15}>
            <CustomButton
              title="Edit profile"
              onPress={() =>
                router.push({
                  pathname: '/user/edit-profile',
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
          <YStack gap={15}>
            <CustomButton
              title="Privacy"
              onPress={() => {}}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              icon={<ChevronRight size="$2" color={Colors.secondary} />}
            />
            {USER_ROLE === 'coach' && (
              <CustomButton
                title="Subscription"
                onPress={() => {}}
                buttonStyle={styles.button}
                textStyle={styles.buttonText}
                icon={<ChevronRight size="$2" color={Colors.secondary} />}
              />
            )}
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
