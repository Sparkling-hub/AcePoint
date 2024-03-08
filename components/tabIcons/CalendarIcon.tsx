import React from 'react';
import Colors from '@/constants/Colors';
import Calendar from '../svg/Calendar';

interface CalendarProps {
  readonly focused: boolean;
}

const CalendarIcon: React.FC<CalendarProps> = ({ focused }) => {
  return <Calendar fill={focused ? Colors.secondary : Colors.primary} />;
};

export default CalendarIcon;
