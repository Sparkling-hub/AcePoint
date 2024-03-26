import React from 'react';
import Colors from '@/constants/Colors';
import Calendar from '../svg/Calendar';


const CalendarIcon = ({ focused, testID }: { readonly focused: boolean, readonly testID: string }) => {
  return <Calendar testID={testID} fill={focused ? Colors.secondary : Colors.primary} />;
};

export default CalendarIcon;
