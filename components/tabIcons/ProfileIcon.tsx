import React from 'react';
import { useSelector } from 'react-redux';

import Account from '@/components/svg/Account';
import Colors from '@/constants/Colors';
import { RootState } from '@/store/store';

const ProfileIcon = ({ focused }: { focused: boolean }) => {
  const keyboardVisible = useSelector(
    (state: RootState) => state.keyboardVisibility.keyboardVisible
  );

  if (keyboardVisible) {
    return <></>;
  }

  return <Account fill={focused ? Colors.secondary : Colors.primary} />;
};

export default ProfileIcon;
