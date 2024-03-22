import React from 'react';
import {
  Platform,
  StatusBar,
  StyleProp,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from 'expo-router';

import { XStack } from 'tamagui';

import HeaderText from './HeaderText';

interface CustomHeaderProps {
  title?: string;
  leftIcon?: React.ReactNode;
  onLeftPress?: () => void;
  rightContent?: React.ReactNode;
  headerTextStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  leftIcon,
  onLeftPress,
  rightContent,
  headerTextStyle,
  isLoading = false,
}) => {
  const navigation = useNavigation();

  const paddingTop = Platform.OS === 'ios' ? 60 : (StatusBar.currentHeight ?? 0) + 29
  return (
    <XStack
      backgroundColor={'#fff'}
      justifyContent={leftIcon || title ? 'space-between' : 'flex-end'}
      alignItems="center"
      paddingHorizontal={16}
      paddingTop={paddingTop}>
      {leftIcon && (
        <TouchableOpacity
          onPress={onLeftPress || (() => navigation.goBack())}
          disabled={isLoading}>
          {leftIcon}
        </TouchableOpacity>
      )}
      {title && <HeaderText text={title} headerTextStyle={headerTextStyle} />}

      {rightContent}
    </XStack>
  );
};

export default CustomHeader;
