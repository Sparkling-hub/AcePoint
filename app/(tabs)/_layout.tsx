import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';

import { useDispatch, useSelector } from 'react-redux';
import { setUserRole } from '@/store/slices/userRole';
import { retrieveData } from '@/api/localStorage';
import ProfileIcon from '@/components/tabIcons/ProfileIcon';
import PorfileIconLabel from '@/components/tabIcons/PorfileIconLabel';
import BookIcon from '@/components/tabIcons/BookIcon';
import BookIconLabel from '@/components/tabIcons/BookIconLabel';
import HomeIcon from '@/components/tabIcons/HomeIcon';
import HomeIconLabel from '@/components/tabIcons/HomeIconLabel';
import ProfileHeader from '@/components/headers/ProfileHeader';
import { RootState } from '@/store/store';

export default function TabLayout() {
  const dispatch = useDispatch();
  const getUserRole = async () => {
    const data = await retrieveData('userType');
    if (data) return dispatch(setUserRole(data));
  };

  useEffect(() => {
    getUserRole();
  }, []);

  const { userRole } = useSelector((state: RootState) => state.userRole);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          shadowColor: 'transparent',
          shadowOpacity: 0,
          elevation: 0,
          paddingHorizontal: 30,
          height: 80,
          flexDirection: 'row',
          alignItems: 'center',
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
          href: userRole === 'Player' ? '/(tabs)/book' : null,
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
