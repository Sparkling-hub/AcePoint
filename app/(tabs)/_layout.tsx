import React, { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useDispatch } from 'react-redux';
import { setUserRole } from '@/store/slices/userRole';
import { retrieveData } from '@/api/localStorage';
import CalendarIcon from '@/components/tabIcons/CalendarIcon';
import CalendarIconLabel from '@/components/tabIcons/CalendarIconLabel';
import { setCalendarOption } from '@/store/slices/calendarSlice';
import ProfileIcon from '@/components/tabIcons/ProfileIcon';
import PorfileIconLabel from '@/components/tabIcons/PorfileIconLabel';
import BookIcon from '@/components/tabIcons/BookIcon';
import BookIconLabel from '@/components/tabIcons/BookIconLabel';
import HomeIcon from '@/components/tabIcons/HomeIcon';
import HomeIconLabel from '@/components/tabIcons/HomeIconLabel';
import ProfileHeader from '@/components/headers/ProfileHeader';
import CalendarHeader from '@/components/headers/CalendarHeader'; 
export default function TabLayout() {
  const dispatch = useDispatch();
  const getUserRole = async () => {
    const data = await retrieveData('userType');
    if (data) return dispatch(setUserRole(data));
  };

  useEffect(() => {
    getUserRole();
  }, [dispatch]);

  const [state, setState] = useState({
    "D": true,
    "W": false,
    "M": false,
  })
  type ButtonKey = 'D' | 'W' | 'M';

  const handleState = (selected: ButtonKey) => {
    setState({ "D": false, "W": false, "M": false, [selected]: true });
    dispatch(setCalendarOption(selected));
  };

  const getButtonStyle = (key: ButtonKey) => ({
    ...styles.button,
    backgroundColor: state[key] ? Colors.secondary : Colors.iron,
    color: state[key] ? Colors.iron : Colors.secondary,
  });

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
        name="calendar-coach"
        options={{
          title: 'Calendar',
          tabBarIcon: CalendarIcon,
          tabBarLabel: CalendarIconLabel,
          header: () => <CalendarHeader handleState={handleState as (selected: string) => void} getButtonStyle={getButtonStyle as (key: string) => object} />,
          headerShadowVisible: false,
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.iron,
    borderRadius: 7,
    paddingLeft: 7,
    paddingRight: 7,
    height: 30,
    marginRight: 2,
    color: Colors.secondary
  },
  buttonText: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    color: Colors.secondary,
  },
})