import React, { useEffect } from 'react';
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
import { useDispatch } from 'react-redux';
import { setUserRole } from '@/store/slices/userRole';
import { retrieveData } from '@/api/localStorage';
import { XStack } from 'tamagui';
import Bell from '@/components/svg/Bell';
import Message from '@/components/svg/Message';

export default function TabLayout() {
  const dispatch = useDispatch();
  const getUserRole = async () => {
    const data = await retrieveData('userType');
    if (data) return dispatch(setUserRole(data));
  };

  useEffect(() => {
    getUserRole();
  }, [dispatch]);

  const ProfileHeader = () => {
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

  const BookHeader = () => {
    return (
      <CustomHeader
        rightContent={
          <XStack alignItems="center" gap={11}>
            <Pressable>
              {({ pressed }) => (
                <Message
                  fill={Colors.secondary}
                  style={{ opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
            <Pressable>
              {({ pressed }) => (
                <Bell
                  fill={Colors.secondary}
                  style={{ opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </XStack>
        }
        title="Book Training"
        headerTextStyle={{ fontSize: 26, lineHeight: 32 }}
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
        tabBarHideOnKeyboard: true,
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
          header: BookHeader,
          tabBarIcon: renderTabBarIconBook,
          tabBarLabel: renderTabBarLabelBook,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: renderTabBarIconProfile,
          tabBarLabel: renderTabBarLabelProfile,
          header: ProfileHeader,
          headerShadowVisible: false,
        }}
      />
    </Tabs>
  );
}
