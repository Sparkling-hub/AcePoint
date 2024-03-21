import { StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { Image, Text, XStack, YStack } from 'tamagui';
import Colors from '@/constants/Colors';

interface SubscriptionBodyProps {
  status: string;
}

const SubscriptionBody: React.FC<SubscriptionBodyProps> = ({ status }) => {
  const renderView = useMemo(() => {
    switch (status) {
      case 'ACTIVE':
        return (
          <XStack
            justifyContent="space-between"
            marginHorizontal={16}
            marginBottom={20}>
            <YStack gap={3}>
              <Text style={[{ fontFamily: 'MontserratMedium' }, styles.text]}>
                Start date:
              </Text>
              <Text style={[{ fontFamily: 'MontserratBold' }, styles.text]}>
                01.01.2024
              </Text>
            </YStack>
            <YStack gap={3}>
              <Text style={[{ fontFamily: 'MontserratMedium' }, styles.text]}>
                Start date:
              </Text>
              <Text style={[{ fontFamily: 'MontserratBold' }, styles.text]}>
                01.01.2024
              </Text>
            </YStack>
          </XStack>
        );
      case 'CANCELED':
        return (
          <XStack
            justifyContent="space-between"
            marginBottom={20}
            alignItems="center">
            <YStack gap={9}>
              <Text style={[{ fontFamily: 'MontserratBold' }, styles.text]}>
                We're sorry to see you go.
              </Text>
              <Text style={[{ fontFamily: 'MontserratMedium' }, styles.text]}>
                Expires on:{' '}
                <Text style={[{ fontFamily: 'MontserratBold' }, styles.text]}>
                  01.01.2024
                </Text>
              </Text>
            </YStack>
            <Image source={require('../assets/images/sad-face.png')} />
          </XStack>
        );
      case 'TRIAL':
        return (
          <XStack marginBottom={20}>
            <YStack gap={9}>
              <Text style={[{ fontFamily: 'MontserratBold' }, styles.text]}>
                Do you like the app ? Get a full membership
              </Text>
              <Text style={[{ fontFamily: 'MontserratMedium' }, styles.text]}>
                Trial Expires on:{' '}
                <Text style={[{ fontFamily: 'MontserratBold' }, styles.text]}>
                  01.01.2024
                </Text>
              </Text>
            </YStack>
          </XStack>
        );
      case 'EXPIRED':
        return (
          <XStack marginBottom={20}>
            <YStack gap={9}>
              <Text style={[{ fontFamily: 'MontserratBold' }, styles.text]}>
                Your subscription expired on:{' '}
                <Text color="#EA0000" style={{ fontFamily: 'MontserratBold' }}>
                  01.01.2024
                </Text>
              </Text>
            </YStack>
          </XStack>
        );
    }
  }, [status]);

  return <YStack>{renderView}</YStack>;
};

export default SubscriptionBody;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 17,
    color: Colors.secondary,
  },
});
