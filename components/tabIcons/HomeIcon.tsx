import React from 'react';
import Home from '@/components/svg/Home';
import Colors from '@/constants/Colors';

const HomeIcon = ({ focused }: { focused: boolean }) => (
  <Home fill={focused ? Colors.secondary : Colors.primary} />
);

export default HomeIcon;
