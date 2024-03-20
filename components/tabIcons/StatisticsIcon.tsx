import React from 'react';

import Colors from '@/constants/Colors';
import Stats from '../svg/Stats';

const StatisticsIcon = ({ focused }: { focused: boolean }) => {
  return <Stats fill={focused ? Colors.secondary : Colors.primary} />;
};

export default StatisticsIcon;
