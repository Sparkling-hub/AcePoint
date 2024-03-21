import { favoriteCoachList } from '@/api/player-api';
import { getCoachById } from '@/api/coach-api';
import { auth, db } from '@/lib/firebase';
import { getDoc, getDocs, doc } from 'firebase/firestore';
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
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
}));
jest.mock('@/lib/firebase', () => ({
  auth: jest.fn(),
}));
describe('favoriteCoachList function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should return "User not authenticated." when currentUser is not defined', async () => {
    auth.currentUser = null;
    const result = await favoriteCoachList();
    expect(result).toBe('User not authenticated.');
  });

  test('should return "Player does not exist." when player does not exist', async () => {
    const mockCurrentUser = { uid: 'user123' };
    auth.currentUser = mockCurrentUser;
    getDoc.mockResolvedValueOnce({ exists: () => false, data: () => null });
    const result = await favoriteCoachList();
    expect(result).toBe('Player does not exist.');
  });

  test('should handle error if fetching coach data fails', async () => {
    const playerData = {
      favoriteCoach: ['coachId1'],
    };
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => playerData,
    });

    getDocs.mockRejectedValueOnce(new Error('Error fetching coach data'));

    const result = await favoriteCoachList();
    expect(result[0]).toBeNull();
  });
});

describe('getCoachById', () => {
  it('returns coach data if document exists', async () => {
    // Setup
    const fakeId = '123';
    const fakeCoachData = { name: 'John Doe', specialty: 'Fitness' };
    const docSnapMock = {
      exists: jest.fn().mockReturnValue(true),
      data: jest.fn().mockReturnValue(fakeCoachData),
    };
    getDoc.mockResolvedValue(docSnapMock);

    // Execute
    const result = await getCoachById(fakeId);

    // Assert
    expect(doc).toHaveBeenCalledWith(db, 'coach', fakeId);
    expect(getDoc).toHaveBeenCalled();
    expect(result).toEqual(fakeCoachData);
  });

  it('logs an error and returns undefined if document does not exist', async () => {
    // Setup
    const fakeId = 'nonexistent';
    const consoleSpy = jest.spyOn(console, 'log');
    const docSnapMock = {
      exists: jest.fn().mockReturnValue(false),
    };
    getDoc.mockResolvedValue(docSnapMock);

    // Execute
    const result = await getCoachById(fakeId);

    // Assert
    expect(doc).toHaveBeenCalledWith(db, 'coach', fakeId);
    expect(getDoc).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('No such document!');
    expect(result).toBeUndefined();

    // Cleanup
    consoleSpy.mockRestore();
  });
});
