import { locationPosition } from '@/api/player-api'
jest.mock('react-native-get-location', () => ({
    getCurrentPosition: jest.fn(() =>
      Promise.resolve({
        latitude: 40.7128,
        longitude: -74.0060,
      })
    ),
  }));
jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
    getReactNativePersistence: jest.fn(),
    initializeAuth: jest.fn(),
}));
jest.mock('firebase/app', () => ({initializeApp: jest.fn(),}));
jest.mock('firebase/storage', () => ({getStorage: jest.fn(),}));
jest.mock('@react-native-async-storage/async-storage', () => ({ReactNativeAsyncStorage: jest.fn()})); 
  describe('locationPosition function', () => {
    it('returns a promise resolving to an object with latitude and longitude', async () => {
        const restlt = await  locationPosition()
        console.log(restlt)
        expect(restlt).toEqual({latitude: 40.7128,longitude: -74.0060,});
    });
});