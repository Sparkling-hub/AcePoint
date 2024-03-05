import { ChevronLeft } from '@tamagui/lucide-icons';
import CustomHeader from '../CustomHeader';
import Colors from '@/constants/Colors';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { updateUser } from '@/api/user-api';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import HeaderText from '../HeaderText';

const EditProfileHeader = () => {
  const userRole = useSelector((state: RootState) => state.userRole);
  const userRoleValue = userRole.userRole;

  const userData = useSelector((state: any) => state.editProfile.UserData);
  const handleSaveProfile = () => {
    updateUser(userData, userRoleValue);
  };

  return (
    <CustomHeader
      leftIcon={<ChevronLeft size={'$2.5'} color={Colors.secondary} />}
      onLeftPress={() => {
        router.navigate('/user/account');
      }}
      title={userRoleValue === 'Coach' ? 'EDIT PROFILE' : ''}
      rightContent={
        <TouchableOpacity onPress={handleSaveProfile}>
          <HeaderText text="SAVE" />
        </TouchableOpacity>
      }
    />
  );
};

export default EditProfileHeader;
