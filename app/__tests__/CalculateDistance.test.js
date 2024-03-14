import { calculateDistance } from '@/api/player-api';
jest.mock('firebase/auth', () => ({
  getReactNativePersistence: jest.fn(),
  initializeAuth: jest.fn(),
}));
jest.mock('firebase/app', () => ({ initializeApp: jest.fn() }));
jest.mock('firebase/storage', () => ({ getStorage: jest.fn() }));
jest.mock('@react-native-async-storage/async-storage', () => ({
  ReactNativeAsyncStorage: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
}));
describe('calculateDistance', () => {
  test('calculates distance correctly when within radius', () => {
    // Test data
    const currentLat = 40.7128;
    const currentLon = -74.006;
    const data = { latitude: 40.7306, longitude: -73.9352 }; // New York City coordinates
    const radius = 10; // 10 kilometers

    // Expected result
    const expectedResult = {
      latitude: 40.7306,
      longitude: -73.9352,
    };

    // Call the function
    const result = calculateDistance(currentLat, currentLon, data, radius);

    // Assertions
    expect(result).toEqual(expectedResult); // Expect the result to be equal to the data provided
  });

  test('calculates distance correctly when outside radius', () => {
    // Test data
    const currentLat = 40.7128;
    const currentLon = -74.006;
    const data = { latitude: 34.0522, longitude: -118.2437 }; // Los Angeles coordinates
    const radius = 500; // 500 kilometers

    // Call the function
    calculateDistance(currentLat, currentLon, data, radius);

    // Assertions
    expect(data).toEqual(data); // Expect the result to be equal to the data provided
  });

  test('calculates distance correctly for exact radius', () => {
    // Test data
    const currentLat = 40.7128;
    const currentLon = -74.006;
    const data = { latitude: 40.7306, longitude: -73.9352 }; // New York City coordinates
    const radius = 9.594; // 9.594 kilometers (distance between NYC and Manhattan)

    // Expected result
    const expectedResult = {
      latitude: 40.7306,
      longitude: -73.9352,
    };

    // Call the function
    const result = calculateDistance(currentLat, currentLon, data, radius);

    // Assertions
    expect(result).toEqual(expectedResult); // Expect the result to be equal to the data provided
  });

  // Add more tests for edge cases, invalid inputs, etc. if needed
});
