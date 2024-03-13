import { ActivityIndicator, TouchableOpacity } from 'react-native';
import HeaderText from '../HeaderText';
import { router } from 'expo-router';
import { ChevronLeft } from '@tamagui/lucide-icons';
import CustomHeader from '../CustomHeader';
import Colors from '@/constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';

import { RootState } from '@/store/store';
import { setSavedFilter } from '@/store/slices/savedFilterSlice';
import { distanceCalculation, filterCoach } from '@/api/player-api';
import { setClubSearchResults } from '@/store/slices/clubSearchResultsSlice';
import { setCoachSearchResults } from '@/store/slices/coachSearchResultsSlice';
import { useState } from 'react';
import fireToast from '../toast/Toast';

const FilterHeader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { tempDistance, tempRating, tempLevel, tempTags } = useSelector(
    (state: RootState) => state.tempFilter
  );

  const dispatch = useDispatch();

  const filterClubs = async (latitude: number, longitude: number) => {
    try {
      let result: any = [];
      result = await distanceCalculation(latitude, longitude, tempDistance[0]);
      console.log('result clubs: ', result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const filterCoaches = async () => {
    try {
      let result: any = [];
      result = await filterCoach(tempRating[0], tempLevel[0], tempTags[0]);
      console.log('result coaches: ', result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    // Dispatch setSavedFilter action with temp filter states
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const [clubResults, coachResults] = await Promise.all([
        filterClubs(latitude, longitude),
        filterCoaches(),
      ]);

      dispatch(setClubSearchResults(clubResults));
      dispatch(setCoachSearchResults(coachResults));

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
    } catch (error) {
      fireToast({
        message: 'Please enable location services',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomHeader
      leftIcon={<ChevronLeft size={'$2.5'} color={Colors.secondary} />}
      onLeftPress={() => {
        router.navigate('/(tabs)/book');
      }}
      isLoading={isLoading}
      title="Filters"
      headerTextStyle={{ fontSize: 26, lineHeight: 32 }}
      rightContent={
        <TouchableOpacity onPress={handleSave} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.secondary} />
          ) : (
            <HeaderText text="SAVE" />
          )}
        </TouchableOpacity>
      }
    />
  );
};

export default FilterHeader;
