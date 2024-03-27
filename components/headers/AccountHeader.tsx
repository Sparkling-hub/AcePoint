import Colors from '@/constants/Colors';
import CustomHeader from '../CustomHeader';
import { router } from 'expo-router';
import { X } from '@tamagui/lucide-icons';

const AccountHeader = () => {
  return (
    <CustomHeader
      leftIcon={<X size={'$2.5'} color={Colors.secondary} />}
      onLeftPress={() => {
        router.navigate('/(tabs)/account');
      }}
    />
  );
};

export default AccountHeader;
