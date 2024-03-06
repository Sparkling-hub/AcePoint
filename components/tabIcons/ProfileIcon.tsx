import React from 'react';

import Account from '@/components/svg/Account';
import Colors from '@/constants/Colors';

const ProfileIcon = ({ focused }: { focused: boolean }) => {
  return <Account fill={focused ? Colors.secondary : Colors.primary} />;
};

export default ProfileIcon;
