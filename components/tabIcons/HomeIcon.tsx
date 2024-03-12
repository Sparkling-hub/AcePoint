import React from 'react';

import Home from '@/components/svg/Home';
import Colors from '@/constants/Colors';
import { RootState } from '@/store/store';

const HomeIcon = ({ focused }: { focused: boolean }) => {
  return <Home fill={focused ? Colors.secondary : Colors.primary} />;
};

export default HomeIcon;
