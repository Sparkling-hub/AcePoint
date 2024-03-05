import React from 'react';
import { useSelector } from 'react-redux';

import Home from '@/components/svg/Home';
import Colors from '@/constants/Colors';
import { RootState } from '@/store/store';

const HomeIcon = ({ focused }: { focused: boolean }) => {
  const keyboardVisible = useSelector(
    (state: RootState) => state.keyboardVisibility.keyboardVisible
  );

  if (keyboardVisible) {
    return <></>;
  }

  return <Home fill={focused ? Colors.secondary : Colors.primary} />;
};

export default HomeIcon;
