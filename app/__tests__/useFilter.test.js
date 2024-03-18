import { useFilter } from '../../hooks/useFilter';
import * as Location from 'expo-location';
import * as playerApi from '../../api/player-api';
import { setClubSearchResults } from '../../store/slices/clubSearchResultsSlice';
import { setCoachSearchResults } from '../../store/slices/coachSearchResultsSlice';
import { setNearbyClubs } from '../../store/slices/nearbyClubsSlice';

import { useDispatch } from 'react-redux';

// Mocking dependencies
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() => ({ status: 'granted' })),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({ coords: { latitude: 0, longitude: 0 } })
  ),
}));

jest.mock('react-redux', () => ({ useDispatch: jest.fn() }));

jest.mock('../../store/slices/coachSearchResultsSlice.ts', () => ({
  setCoachSearchResults: jest.fn(),
}));

jest.mock('../../store/slices/clubSearchResultsSlice.ts', () => ({
  setClubSearchResults: jest.fn(),
}));

jest.mock('../../store/slices/nearbyClubsSlice.ts', () => ({
  setNearbyClubs: jest.fn(),
}));

jest.mock('../../api/player-api', () => ({
  distanceCalculation: jest.fn(() => []),
  filterCoach: jest.fn(() => []),
}));

jest.mock('../../store/slices/clubSearchResultsSlice.ts', () => ({
  setClubSearchResults: jest.fn(),
}));

jest.mock('../../store/slices/coachSearchResultsSlice.ts', () => ({
  setCoachSearchResults: jest.fn(),
}));

describe('useFilter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call distanceCalculation and filterCoach with correct arguments', async () => {
    // Mocking useDispatch
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    // Test data
    const distance = 10;
    const rating = 4;
    const level = 3;
    const tags = ['tag1', 'tag2'];

    // Triggering the hook
    await useFilter().performFilter(distance, rating, level, tags);

    // Assertions
    expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(Location.getCurrentPositionAsync).toHaveBeenCalledTimes(1);
    expect(playerApi.distanceCalculation).toHaveBeenCalledWith(0, 0, distance);
    expect(playerApi.filterCoach).toHaveBeenCalledWith(rating, level, tags);
  });

  it('should dispatch club and coach search results', async () => {
    // Mocking useDispatch
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    // Mocking API responses
    const clubResults = [{ name: 'Club 1' }, { name: 'Club 2' }];
    const coachResults = [{ name: 'Coach 1' }, { name: 'Coach 2' }];
    playerApi.distanceCalculation.mockResolvedValueOnce(clubResults);
    playerApi.filterCoach.mockResolvedValueOnce(coachResults);

    // Test data
    const distance = 10;
    const rating = 4;
    const level = 3;
    const tags = ['tag1', 'tag2'];

    // Triggering the hook
    await useFilter().performFilter(distance, rating, level, tags);

    // Assertions
    expect(mockDispatch).toHaveBeenCalledWith(
      setClubSearchResults(clubResults)
    );
    expect(mockDispatch).toHaveBeenCalledWith(setNearbyClubs(clubResults));
    expect(mockDispatch).toHaveBeenCalledWith(
      setCoachSearchResults(coachResults)
    );
  });

  it('should handle location permission denied', async () => {
    // Mocking useDispatch
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    // Mocking permission denied scenario
    Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({
      status: 'denied',
    });

    // Test data
    const distance = 10;
    const rating = 4;
    const level = 3;
    const tags = ['tag1', 'tag2'];

    // Triggering the hook
    await useFilter().performFilter(distance, rating, level, tags);
  });

  it('should handle error during filtering', async () => {
    // Mocking useDispatch
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    // Mocking error scenario
    const error = new Error('Filtering error');
    playerApi.distanceCalculation.mockRejectedValueOnce(error);

    // Test data
    const distance = 10;
    const rating = 4;
    const level = 3;
    const tags = ['tag1', 'tag2'];

    // Triggering the hook
    await useFilter().performFilter(distance, rating, level, tags);
  });
});
