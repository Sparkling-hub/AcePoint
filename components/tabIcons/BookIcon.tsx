import React from 'react';
import Check from '@/components/svg/Check';
import Colors from '@/constants/Colors';

const BookIcon = ({ focused }: { focused: boolean }) => (
  <Check fill={focused ? Colors.secondary : Colors.primary} />
);

export default BookIcon;
