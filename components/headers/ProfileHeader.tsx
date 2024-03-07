import { Pressable } from 'react-native';
import CustomHeader from '../CustomHeader';
import Bars from '../svg/Bars';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';

const ProfileHeader = () => {
  return (
    <CustomHeader
      rightContent={
        <Link href="/user/account" asChild>
          <Pressable>
            {({ pressed }) => (
              <Bars
                fill={Colors.secondary}
                style={{ opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      }
    />
  );
};

export default ProfileHeader;
