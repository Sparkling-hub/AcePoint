import React from 'react';
import Check from '@/components/svg/Check';
import Colors from '@/constants/Colors';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const BookIcon = ({ focused }: { focused: boolean }) => {
  const keyboardVisible = useSelector(
    (state: RootState) => state.keyboardVisibility.keyboardVisible
  );

  if (keyboardVisible) {
    return <></>;
  }

  return <Check fill={focused ? Colors.secondary : Colors.primary} />;
};

export default BookIcon;
