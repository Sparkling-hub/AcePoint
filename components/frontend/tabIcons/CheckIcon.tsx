import React from 'react';
import Check from '@/components/frontend/svg/Check';
import Colors from '@/constants/Colors';

interface CheckIconProps {
  focused: boolean;
}

const CheckIcon: React.FC<CheckIconProps> = ({ focused }) => {
  return <Check fill={focused ? Colors.secondary : Colors.primary} />;
};

export default CheckIcon;
