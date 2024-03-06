import React, { useEffect, useState } from 'react';
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
import CalendarIcon from '@/components/tabIcons/CalendarIcon';
import CalendarIconLabel from '@/components/tabIcons/CalendarIconLabel';
import { ChevronLeft } from '@tamagui/lucide-icons';
import { Button, View } from 'tamagui';
import { StyleSheet } from "react-native";
import Calendar from '@/components/svg/Calendar';
import { setCalendarOption } from '@/store/slices/calendarSlice';

export default function TabLayout() {
  const dispatch = useDispatch();
  const getUserRole = async () => {
    const data = await retrieveData('userType');
    if (data) return dispatch(setUserRole(data));
  };

  useEffect(() => {
    getUserRole();
  }, [dispatch]);

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
  const CalendarHeader = () => {
    return (
      <CustomHeader
        leftIcon={<ChevronLeft size={'$2.5'} color={Colors.secondary} />}
        rightContent={
          <View style={styles.header}>
            <Calendar fill={Colors.secondary} style={{ marginRight: 20, marginTop: 3 }}></Calendar>
            {['D', 'W', 'M'].map((key) => (
              <Button key={key} style={getButtonStyle(key as ButtonKey)} onPress={() => handleState(key as ButtonKey)}>
                {key}
              </Button>
            ))}
          </View>
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
        name="calendar-coach"
        options={{
          title: 'Calendar',
          tabBarIcon: CalendarIcon,
          tabBarLabel: CalendarIconLabel,
          header: CalendarHeader,
          headerShadowVisible: false,
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