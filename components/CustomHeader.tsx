import React from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

import { XStack } from 'tamagui';

import HeaderText from './HeaderText';

interface CustomHeaderProps {
  title?: string;
  leftIcon?: React.ReactNode;
  onLeftPress?: () => void;
  rightContent?: () => React.ReactNode;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  leftIcon,
  onLeftPress,
  rightContent,
}) => {
  const navigation = useNavigation();

  return (
    <XStack
      backgroundColor={'#fff'}
      justifyContent={leftIcon ? 'space-between' : 'flex-end'}
      alignItems="center"
      paddingHorizontal={16}
      paddingTop={(StatusBar.currentHeight ?? 0) + 29}>
      {leftIcon && (
        <TouchableOpacity onPress={onLeftPress || (() => navigation.goBack())}>
          {leftIcon}
        </TouchableOpacity>
      )}
      {title && <HeaderText text={title} />}

      {rightContent && rightContent()}
    </XStack>
  );
};

export default CustomHeader;
