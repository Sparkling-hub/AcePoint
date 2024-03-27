import React from 'react';
import CustomHeader from '../CustomHeader';
import { ChevronLeft } from '@tamagui/lucide-icons';
import Colors from '@/constants/Colors';
import { View } from 'tamagui';
import HeaderText from '../HeaderText';

const SubscriptionHeader = () => {
  return (
    <CustomHeader
      leftIcon={<ChevronLeft size={'$2.5'} color={Colors.secondary} />}
      title="SUBSCRIPTION"
      rightContent={
        <View>
          <HeaderText text="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" />
        </View>
      }
    />
  );
};

export default SubscriptionHeader;
