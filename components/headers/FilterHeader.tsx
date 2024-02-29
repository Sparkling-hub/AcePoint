import { TouchableOpacity } from 'react-native';
import HeaderText from '../HeaderText';
import { router } from 'expo-router';
import { ChevronLeft } from '@tamagui/lucide-icons';
import CustomHeader from '../CustomHeader';
import Colors from '@/constants/Colors';

const FilterHeader = () => {
  return (
    <CustomHeader
      leftIcon={<ChevronLeft size={'$2.5'} color={Colors.secondary} />}
      onLeftPress={() => {
        router.navigate('/(tabs)/book');
      }}
      title="Filters"
      headerTextStyle={{ fontSize: 26, lineHeight: 32 }}
      rightContent={
        <TouchableOpacity onPress={() => console.log('pressed')}>
          <HeaderText text="SAVE" />
        </TouchableOpacity>
      }
    />
  );
};

export default FilterHeader;
