import { useDispatch } from 'react-redux';
import * as Location from 'expo-location';
import { distanceCalculation, filterCoach } from '@/api/player-api';
import fireToast from '@/components/toast/Toast';
import { setFilterIsLoading } from '@/store/slices/filterIsLoadingSlice';
import { setClubSearchResults } from '@/store/slices/clubSearchResultsSlice';
import { setCoachSearchResults } from '@/store/slices/coachSearchResultsSlice';

export const useFilter = () => {
  const dispatch = useDispatch();

  const filterClubs = async (distance: number) => {
    if (distance === 0) {
      return;
    }
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      let result: any = [];
      result = await distanceCalculation(latitude, longitude, distance);
      console.log('result clubs: ', result);
      return result;
    } catch (error) {
      fireToast({
        message: 'Please enable location services',
        type: 'error',
      });
    }
  };

  const filterCoaches = async (rating: number, level: number, tags: string) => {
    try {
      let result: any = [];
      result = await filterCoach(rating, level, tags);
      console.log('result coaches: ', result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  const performFilter = async (
    distance: number,
    rating: number,
    level: number,
    tags: string
  ) => {
    dispatch(setFilterIsLoading(true));
    try {
      const [clubResults, coachResults] = await Promise.all([
        filterClubs(distance),
        filterCoaches(rating, level, tags),
      ]);

      dispatch(setClubSearchResults(clubResults));
      dispatch(setCoachSearchResults(coachResults));
    } catch (error) {
      console.error('Error filtering:', error);
    } finally {
      dispatch(setFilterIsLoading(false));
    }
  };

  return { performFilter };
};
