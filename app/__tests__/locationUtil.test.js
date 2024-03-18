// __tests__/locationUtil.test.js
import { getCurrentLocation } from '../../utils/LocationUtil';
import * as Location from 'expo-location';
import fireToast from '../../components/toast/Toast';

// Mocking the expo-location module
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest
    .fn()
    .mockResolvedValue({ status: 'granted' }),
  getCurrentPositionAsync: jest
    .fn()
    .mockResolvedValue({ coords: { latitude: 40.7128, longitude: -74.006 } }),
}));

// Mocking the fireToast function
jest.mock('../../components/toast/Toast', () => jest.fn());

describe('getCurrentLocation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return region when permission is granted', async () => {
    const region = await getCurrentLocation();

    expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalled();
    expect(Location.getCurrentPositionAsync).toHaveBeenCalled();
    expect(region).toEqual({
      latitude: 40.7128,
      longitude: -74.006,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });
    expect(fireToast).not.toHaveBeenCalled();
  });

  it('should display error console when permission is denied', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({
      status: 'denied',
    });

    await getCurrentLocation();

    expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalled();
    expect(Location.getCurrentPositionAsync).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Permission to access location was denied'
    );
    consoleSpy.mockRestore();
  });

  it('should display error toast when getCurrentPositionAsync throws an error', async () => {
    Location.getCurrentPositionAsync.mockRejectedValueOnce(
      new Error('Something went wrong')
    );

    await getCurrentLocation();

    expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalled();
    expect(Location.getCurrentPositionAsync).toHaveBeenCalled();
    expect(fireToast).toHaveBeenCalledWith({
      message: 'Please enable location services',
      type: 'error',
    });
  });
});
