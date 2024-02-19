import React from 'react';
import Account from '@/components/svg/Account';
import Colors from '@/constants/Colors';

interface AccountIconProps {
  focused: boolean;
}

const AccountIcon: React.FC<AccountIconProps> = ({ focused }) => {
  return <Account fill={focused ? Colors.secondary : Colors.primary} />;
};

export default AccountIcon;
