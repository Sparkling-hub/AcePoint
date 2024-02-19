import React from 'react';

import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';

import TabBarText from '@/components/TabBarText';
import HomeIcon from '@/components/tabIcons/HomeIcon';
import AccountIcon from '@/components/tabIcons/AccountIcon';
import CheckIcon from '@/components/tabIcons/CheckIcon';
import CustomHeader from '@/components/CustomHeader';
import Bars from '@/components/svg/Bars';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          shadowColor: 'transparent',
          shadowOpacity: 0,
          elevation: 0,
          paddingHorizontal: 30,
          paddingBottom: 20,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} text="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          title: 'Find and Book',
          tabBarIcon: ({ focused }) => <CheckIcon focused={focused} />,
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} text="Find and Book" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => <AccountIcon focused={focused} />,
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} text="Account" />
          ),
          header: () => (
            <CustomHeader
              rightContent={
                <Link href="/user/account" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <Bars
                        fill={Colors.secondary}
                        style={{ opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              }
            />
          ),
          headerShadowVisible: false,
        }}
      />
    </Tabs>
  );
}
