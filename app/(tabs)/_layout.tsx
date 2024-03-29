import React, { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import CustomHeader from '@/components/CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import { setUserRole } from '@/store/slices/userRole';
import { retrieveData } from '@/api/localStorage';
import CalendarIcon from '@/components/tabIcons/CalendarIcon';
import CalendarIconLabel from '@/components/tabIcons/CalendarIconLabel';
import { Button, View } from 'tamagui';
import { Platform, StyleSheet } from 'react-native';
import Calendar from '@/components/svg/Calendar';
import { setCalendarOption } from '@/store/slices/calendarSlice';
import ProfileIcon from '@/components/tabIcons/ProfileIcon';
import PorfileIconLabel from '@/components/tabIcons/PorfileIconLabel';
import BookIcon from '@/components/tabIcons/BookIcon';
import BookIconLabel from '@/components/tabIcons/BookIconLabel';
import HomeIcon from '@/components/tabIcons/HomeIcon';
import HomeIconLabel from '@/components/tabIcons/HomeIconLabel';
import ProfileHeader from '@/components/headers/ProfileHeader';
import { RootState } from '@/store/store';

const CalendarHeader = ({
  handleState,
  getButtonStyle,
}: {
  handleState: (selected: string) => void;
  getButtonStyle: (key: string) => React.CSSProperties;
}) => {
  return (
    <CustomHeader
      rightContent={
        <View style={styles.header}>
          <Calendar
            fill={Colors.secondary}
            style={{ marginRight: 20, marginTop: 3 }}
          />
          {['D', 'W', 'M'].map((key) => (
            <Button
              key={key}
              style={getButtonStyle(key)}
              onPress={() => handleState(key)}>
              {key}
            </Button>
          ))}
        </View>
      }
    />
  );
};
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

  const [state, setState] = useState({
    D: true,
    W: false,
    M: false,
  });
  type ButtonKey = 'D' | 'W' | 'M';

  const handleState = (selected: ButtonKey) => {
    setState({ D: false, W: false, M: false, [selected]: true });
    dispatch(setCalendarOption(selected));
  };

  const getButtonStyle = (key: ButtonKey) => ({
    ...styles.button,
    backgroundColor: state[key] ? Colors.secondary : Colors.iron,
    color: state[key] ? Colors.iron : Colors.secondary,
  });

  const renderCalendarHeader = () => {
    return (
      <CalendarHeader
        handleState={(selected: any) => handleState(selected as ButtonKey)}
        getButtonStyle={(key: any) => getButtonStyle(key as ButtonKey)}
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
          height: Platform.OS === 'ios' ? 100 : 80,
          paddingTop: Platform.OS === 'ios' ? 30 : 10,
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
          header: renderCalendarHeader,
          headerShadowVisible: false,
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
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
    color: Colors.secondary,
  },
  buttonText: {
    fontFamily: 'MontserratBold',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    color: Colors.secondary,
  },
});
