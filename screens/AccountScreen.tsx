import { Platform } from 'react-native';
import { Text, XStack, YStack } from 'tamagui';
import { ChevronRight } from '@tamagui/lucide-icons';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import PorfilePicture from '@/components/PorfilePicture';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { styles } from '@/components/ButtonStyles';
import { handleLogout } from '@/components/auth/Logout';

export default function AccountScreen() {
  const [username, setUsername] = useState('');

  const getUserData = async () => {
    const name = await ReactNativeAsyncStorage.getItem('username');
    if (name) return setUsername(name);
  };
  useEffect(() => {
    getUserData();
  }, []);

  const userRole: any = useSelector((state: RootState) => state.userRole);
  const userRoleValue = userRole.userRole;

  const calculatePaddingTop = () => {
    if (userRoleValue === 'Coach') {
      return 0;
    } else {
      return Platform.OS === 'ios' ? 90 : 30;
    }
  };

  const paddingTop = calculatePaddingTop();

  return (
    <YStack flex={1} paddingTop={paddingTop}>
      {userRoleValue === 'Player' ? (
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
              onPress={() => { router.push('/user/setting') }}
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
              onPress={() => { router.push('/support') }}
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
              onPress={() => { router.navigate('/legal') }}
              buttonStyle={styles.button}
              textStyle={styles.buttonText}
              icon={<ChevronRight size="$2" color={Colors.secondary} />}
            />
            {userRoleValue === 'Coach' && (
              <CustomButton
                title="Subscription"
                onPress={() => { }}
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
            handleLogout();
          }}
        />
      </YStack>
    </YStack>
  );
}