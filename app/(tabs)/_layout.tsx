import React from 'react';

import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';

import Home from '@/components/svg/Home';

import Check from '@/components/svg/Check';
import Account from '@/components/svg/Account';
import { Text } from 'tamagui';
import { StyleSheet } from 'react-native';
import { AlignJustify } from '@tamagui/lucide-icons';
import { USER_ROLE } from '@/constants/User';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          shadowColor: 'transparent',
          shadowOpacity: 0,
          elevation: 0,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Home fill={focused ? Colors.secondary : Colors.primary} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={styles.tabBarLabelStyle}
              color={focused ? Colors.secondary : Colors.primary}>
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          title: 'Find and Book',
          tabBarIcon: ({ focused }) => (
            <Check fill={focused ? Colors.secondary : Colors.primary} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={styles.tabBarLabelStyle}
              color={focused ? Colors.secondary : Colors.primary}>
              Find and Book
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarIcon: ({ focused }) => (
            <Account fill={focused ? Colors.secondary : Colors.primary} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={styles.tabBarLabelStyle}
              color={focused ? Colors.secondary : Colors.primary}>
              Account
            </Text>
          ),
          headerTitle: '',
          headerRight: () => (
            <Link
              href={
                USER_ROLE === 'coach' ? '/coach/account' : '/player/account'
              }
              asChild>
              <Pressable>
                {({ pressed }) => (
                  <AlignJustify
                    size={'$2'}
                    color={Colors.secondary}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerShadowVisible: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontFamily: 'MontserratBold',
    fontSize: 10,
    lineHeight: 10,
  },
});
