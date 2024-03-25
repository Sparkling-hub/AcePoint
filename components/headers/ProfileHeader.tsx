import { TouchableOpacity } from 'react-native';
import CustomHeader from '../CustomHeader';
import Bars from '../svg/Bars';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import Message from '../svg/Message';
import { XStack } from 'tamagui';

const ProfileHeader = () => {
  return (
    <CustomHeader
      rightContent={
        <XStack gap={'$3'} alignItems="center">
          <Link href="/account/chat" asChild>
            <TouchableOpacity>
              <Message fill={Colors.secondary} />
            </TouchableOpacity>
          </Link>
          <Link href="/user/account" asChild>
            <TouchableOpacity>
              <Bars fill={Colors.secondary} />
            </TouchableOpacity>
          </Link>
        </XStack>
      }
    />
  );
};

export default ProfileHeader;
