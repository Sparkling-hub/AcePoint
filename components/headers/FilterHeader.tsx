import { TouchableOpacity } from 'react-native';
import HeaderText from '../HeaderText';
import { router } from 'expo-router';
import { ChevronLeft } from '@tamagui/lucide-icons';
import CustomHeader from '../CustomHeader';
import Colors from '@/constants/Colors';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/store';
import { setSavedFilter } from '@/store/slices/savedFilterSlice';

import fireToast from '../toast/Toast';
import { useFilter } from '@/hooks/useFilter';

const FilterHeader = () => {
  const { tempDistance, tempRating, tempLevel, tempTags } = useSelector(
    (state: RootState) => state.tempFilter
  );

  const dispatch = useDispatch();
  const { performFilter } = useFilter();

  const handleSave = async () => {
    if (
      tempDistance[0] === 0 &&
      tempRating[0] === 0 &&
      tempLevel[0] === 0 &&
      tempTags[0] === undefined
    ) {
      fireToast({
        message: 'Please select a filter',
        type: 'error',
      });
      return;
    }
    // Dispatch setSavedFilter action with temp filter states
    dispatch(
      setSavedFilter({
        distance: tempDistance,
        rating: tempRating,
        level: tempLevel,
        tags: tempTags,
      })
    );
    // Navigate back to the previous screen
    router.navigate('/(tabs)/book');
    performFilter(tempDistance[0], tempRating[0], tempLevel[0], tempTags[0]);
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
