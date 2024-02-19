import { ChevronLeft } from '@tamagui/lucide-icons';
import CustomHeader from './CustomHeader';
import { TouchableOpacity } from 'react-native';
import HeaderText from './HeaderText';
import Colors from '@/constants/Colors';

interface EditProfileHeaderProps {
  title: string;
}

const EditProfileHeader: React.FC<EditProfileHeaderProps> = ({ title }) => {
  return (
    <CustomHeader
      leftIcon={<ChevronLeft size={'$2.5'} color={Colors.secondary} />}
      title={title}
      rightContent={
        <TouchableOpacity onPress={() => console.log('pressed')}>
          <HeaderText text="Save" />
        </TouchableOpacity>
      }
    />
  );
};

export default EditProfileHeader;
