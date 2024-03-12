import { TouchableOpacity } from 'react-native';
import HeaderText from '../HeaderText';
import { router } from 'expo-router';
import { ChevronLeft } from '@tamagui/lucide-icons';
import CustomHeader from '../CustomHeader';
import Colors from '@/constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';

import { RootState } from '@/store/store';
import { setSavedFilter } from '@/store/slices/savedFilterSlice';
import { distanceCalculation, locationPosition } from '@/api/player-api';

const FilterHeader = () => {
  const dispatch = useDispatch();

  const { tempDistance, tempRating, tempLevel, tempTags } = useSelector(
    (state: RootState) => state.tempFilter
  );

  const filterClub = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      // console.log('longitude: ', longitude);
      // console.log('latitude: ', latitude);

      let result: any = [];

      result = await distanceCalculation(latitude, longitude, tempDistance[0]);
      console.log('result front: ', result);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const handleSave = async () => {
    // Dispatch setSavedFilter action with temp filter states
    dispatch(
      setSavedFilter({
        distance: tempDistance,
        rating: tempRating,
        level: tempLevel,
        tags: tempTags,
      })
    );

    await filterClub();

    // result = await FilterCoach(tempRating[0], tempLevel[0], tempTags[0]);

    // console.log(result);

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
