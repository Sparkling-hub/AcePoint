import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';

import { useDispatch } from 'react-redux';
import { setUserRole } from '@/store/slices/userRole';
import { retrieveData } from '@/api/localStorage';
import ProfileIcon from '@/components/tabIcons/ProfileIcon';
import PorfileIconLabel from '@/components/tabIcons/PorfileIconLabel';
import BookIcon from '@/components/tabIcons/BookIcon';
import BookIconLabel from '@/components/tabIcons/BookIconLabel';
import HomeIcon from '@/components/tabIcons/HomeIcon';
import HomeIconLabel from '@/components/tabIcons/HomeIconLabel';
import ProfileHeader from '@/components/headers/ProfileHeader';
import { Keyboard } from 'react-native';
import { setKeyboardVisibility } from '@/store/slices/keyboardVisibility';

export default function TabLayout() {
  const dispatch = useDispatch();
  const getUserRole = async () => {
    const data = await retrieveData('userType');
    if (data) return dispatch(setUserRole(data));
  };

  useEffect(() => {
    getUserRole();
  }, [dispatch]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        dispatch(setKeyboardVisibility(true));
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        dispatch(setKeyboardVisibility(false));
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [dispatch]);

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
          tabBarIcon: HomeIcon,
          tabBarLabel: HomeIconLabel,
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          tabBarIcon: BookIcon,
          tabBarLabel: BookIconLabel,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ProfileIcon,
          tabBarLabel: PorfileIconLabel,
          header: ProfileHeader,
          headerShadowVisible: false,
        }}
      />
    </Tabs>
  );
}
