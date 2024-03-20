import { getCoachById } from '@/api/coach-api';
import { changeSubscription } from '@/api/subscription-api';
import CustomButton from '@/components/CustomButton';
import SubscriptionBody from '@/components/SubscriptionBody';
import Colors from '@/constants/Colors';
import { auth } from '@/lib/firebase';
import { subscriptionEnum } from '@/model/subscriptionEnum';

import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { Text, YStack } from 'tamagui';

const SubscriptionScreen = () => {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getCoachSubscriptionStatus = async () => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const coach = await getCoachById(user.uid);
        if (coach) {
          setStatus(coach.subscription);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCoachSubscriptionStatus();
  }, []);

  const statusColor = useMemo(() => {
    switch (status) {
      case 'ACTIVE':
        return Colors.primary;
      case 'CANCELED':
        return '#DB3E00';
      case 'TRIAL':
        return '#DBD200';
    }
  }, [status]);

  const renderButton = useMemo(() => {
    switch (status) {
      case 'ACTIVE':
        return (
          <CustomButton
            title="Cancel Subscription"
            buttonStyle={[styles.button, { backgroundColor: '#A62929' }]}
            onPress={() => {
              changeSubscription({ subscription: subscriptionEnum.CANCELED });
              setStatus('CANCELED');
            }}
          />
        );
      case 'CANCELED':
        return (
          <CustomButton
            title="Keep my subscription"
            buttonStyle={styles.button}
            onPress={() => {
              changeSubscription({ subscription: subscriptionEnum.ACTIVE });
              setStatus('ACTIVE');
            }}
          />
        );
      case 'TRIAL':
        return (
          <CustomButton
            title="Upgrade my subscription"
            buttonStyle={styles.button}
            onPress={() => {
              changeSubscription({ subscription: subscriptionEnum.ACTIVE });
              setStatus('ACTIVE');
            }}
          />
        );
    }
  }, [status]);

  return (
    <YStack paddingTop={22} flex={1} paddingHorizontal={20}>
      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <>
          <Text
            textAlign="center"
            style={{ fontFamily: 'MontserratMedium' }}
            color={Colors.secondary}
            fontSize={16}
            lineHeight={19}
            marginBottom={53}
            textTransform="uppercase">
            status:{' '}
            <Text style={{ fontFamily: 'MontserratBold' }} color={statusColor}>
              {status}
            </Text>
          </Text>
          <SubscriptionBody status={status} />
          {renderButton}
        </>
      )}
    </YStack>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginVertical: 12,
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },

  buttonText: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
