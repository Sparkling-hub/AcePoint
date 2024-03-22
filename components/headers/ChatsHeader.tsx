import React from 'react';
import CustomHeader from '../CustomHeader';
import { ChevronLeft } from '@tamagui/lucide-icons';
import Colors from '@/constants/Colors';
import HeaderText from '../HeaderText';
import { View } from 'tamagui';

const ChatsHeader = () => {
  return (
    <CustomHeader
      leftIcon={<ChevronLeft size={'$2.5'} color={Colors.secondary} />}
      title="CHATS"
      rightContent={
        <View>
          <HeaderText text="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" />
        </View>
      }
    />
  );
};

export default ChatsHeader;
