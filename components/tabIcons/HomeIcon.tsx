import React from 'react';
import Home from '@/components/svg/Home';
import Colors from '@/constants/Colors';

interface HomeIconProps {
  focused: boolean;
}

const HomeIcon: React.FC<HomeIconProps> = ({ focused }) => {
  return <Home fill={focused ? Colors.secondary : Colors.primary} />;
};

export default HomeIcon;
