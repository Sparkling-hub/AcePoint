import { TouchableOpacity } from 'react-native';
import HeaderText from '../HeaderText';
import { router } from 'expo-router';
import { ChevronLeft } from '@tamagui/lucide-icons';
import CustomHeader from '../CustomHeader';
import Colors from '@/constants/Colors';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { setSavedFilter } from '@/store/slices/savedFilterSlice';
import { resetTempFilter } from '@/store/slices/tempFilterSlice';

const FilterHeader = () => {
  const dispatch = useDispatch();

  const { tempDistance, tempRating, tempLevel, tempTags } = useSelector(
    (state: RootState) => state.tempFilter
  );

  const handleSave = () => {
    // Dispatch setSavedFilter action with temp filter states
    dispatch(
      setSavedFilter({
        distance: tempDistance,
        rating: tempRating,
        level: tempLevel,
        tags: tempTags,
      })
    );
    // Reset temp filter states
    dispatch(resetTempFilter());
    // Navigate back to the previous screen
    router.navigate('/(tabs)/book');
  };
  return (
    <CustomHeader
      leftIcon={<ChevronLeft size={'$2.5'} color={Colors.secondary} />}
      onLeftPress={() => {
        router.navigate('/(tabs)/book');
      }}
      title="Filters"
      headerTextStyle={{ fontSize: 26, lineHeight: 32 }}
      rightContent={
        <TouchableOpacity onPress={handleSave}>
          <HeaderText text="SAVE" />
        </TouchableOpacity>
      }
    />
  );
};

export default FilterHeader;
