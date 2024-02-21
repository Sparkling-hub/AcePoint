import React from 'react';

import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';

import CustomHeader from '@/components/CustomHeader';
import Bars from '@/components/svg/Bars';
import {
  renderTabBarIcon,
  renderTabBarIconBook,
  renderTabBarIconProfile,
  renderTabBarLabel,
  renderTabBarLabelBook,
  renderTabBarLabelProfile,
} from '@/helpers/TabBarHelper';

export default function TabLayout() {
  const renderHeader = () => {
    return (
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
    );
  };

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
<<<<<<< HEAD
        
=======
>>>>>>> 0376c0959368356cd611ab2042ba19a23b3a32fd
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: renderTabBarIcon,
          tabBarLabel: renderTabBarLabel,
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          title: 'Find and Book',
          tabBarIcon: renderTabBarIconBook,
          tabBarLabel: renderTabBarLabelBook,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: renderTabBarIconProfile,
          tabBarLabel: renderTabBarLabelProfile,
          header: renderHeader,
          headerShadowVisible: false,
        }}
      />
    </Tabs>
  );
}
