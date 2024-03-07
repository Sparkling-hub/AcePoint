import { collection, query, getDocs } from 'firebase/firestore';
import { findByName } from '@/api/player-api';

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
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  orderBy: jest.fn(),
  startAt: jest.fn(),
  endAt: jest.fn(),
}));

describe('findByName', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return clubs when a name is provided', async () => {
    const name = 'ClubA';
    const mockClubs = [{ id: '1', data: () => ({ name: 'ClubA' }) }];
    const mockQuery = jest.fn();
    query.mockReturnValue(mockQuery);
    getDocs.mockResolvedValueOnce({
      empty: false,
      forEach: jest.fn((callback) => mockClubs.forEach(callback)),
    });

    const result = await findByName({ name });
    result.forEach((club) => {
      expect(club.name).toEqual(mockClubs[0].data().name);
    });
  });

  test('should return all clubs when the name is empty', async () => {
    const mockClubs = [{ id: '1', data: () => ({ name: 'ClubA' }) }];
    const mockCollection = jest.fn();
    collection.mockReturnValue(mockCollection);
    getDocs.mockResolvedValueOnce({
      empty: false,
      forEach: jest.fn((callback) => mockClubs.forEach(callback)),
    });

    const result = await findByName({ name: '' });

    result.forEach((club) => {
      expect(club.data()).toEqual(mockClubs[0].data());
    });
  });

  test('should return empty array if no clubs found', async () => {
    const result = await findByName({ name: 'NonExistentCoach' });
    expect(result).toEqual([]);
  });

  test('should return error message if an error occurs', async () => {
    const name = 'ClubA';
    const errorMessage = 'An error occurred';
    const mockQuery = jest.fn();
    query.mockReturnValue(mockQuery);
    getDocs.mockRejectedValueOnce(new Error(errorMessage));

    const result = await findByName({ name });

    expect(result).toBe(errorMessage);
  });
});
