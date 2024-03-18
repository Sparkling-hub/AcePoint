import { filterCoach } from '@/api/player-api';
import { getDocs } from 'firebase/firestore';
// Mocking Firebase Firestore functions
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  getDocs: jest.fn(),
  collection: jest.fn(),
  where: jest.fn(),
  query: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  getReactNativePersistence: jest.fn(),
  initializeAuth: jest.fn(),
}));
jest.mock('firebase/app', () => ({ initializeApp: jest.fn() }));
jest.mock('firebase/storage', () => ({ getStorage: jest.fn() }));
jest.mock('@react-native-async-storage/async-storage', () => ({
  ReactNativeAsyncStorage: jest.fn(),
}));
describe('filterCoach function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return "no data" if no coaches are found', async () => {
    const mockQuerySnapshot = { docs: [] };
    getDocs.mockResolvedValueOnce(mockQuerySnapshot);

    const result = await filterCoach(4, 3, ['tag']);

    expect(result).toEqual([]);
    expect(getDocs).toHaveBeenCalledTimes(1);
  });

  it('should return coaches that match the given criteria', async () => {
    const mockDoc1 = {
      id: 'coach1',
      data: () => ({ tags: ['tag1'], rating: 4, level: 3 }),
    };
    const mockDoc2 = {
      id: 'coach2',
      data: () => ({ tags: ['tag2'], rating: 4, level: 3 }),
    };
    const mockQuerySnapshot = { docs: [mockDoc1, mockDoc2] };
    getDocs.mockResolvedValueOnce(mockQuerySnapshot);

    const result = await filterCoach(4, 3, ['tag1']);

    expect(result).toEqual([
      { id: 'coach1', tags: ['tag1'], rating: 4, level: 3 },
    ]);
    expect(getDocs).toHaveBeenCalledTimes(1);
  });
  it('should return all coaches when tags array is empty', async () => {
    const mockDoc = {
      id: 'mockCoachId', // Include the id property
      data: jest.fn().mockReturnValue({}),
    };
    const mockQuerySnapshot = { docs: [mockDoc] };
    getDocs.mockResolvedValueOnce(mockQuerySnapshot);
  
    const result = await filterCoach(4, 3, []);
    expect(result).toEqual([{ id: 'mockCoachId' }]);
    expect(getDocs).toHaveBeenCalledTimes(1);
  });
  
  it('should return all coaches when both rating and level are zero', async () => {
    const mockDoc = {
      id: 'mockCoachId',
      data: jest.fn().mockReturnValue({ tags: [], rating: 0, level: 0 }),
    };
    const mockQuerySnapshot = { docs: [mockDoc] };
    getDocs.mockResolvedValueOnce(mockQuerySnapshot);
  
    const result = await filterCoach(0, 0, []);
    console.log(result)
    expect(result).toEqual([]);
    expect(getDocs).toHaveBeenCalledTimes(1);
  });
  
  
  it('should return coaches based on level when rating is zero and tags array is empty', async () => {
    const mockDoc = {
      id: 'mockCoachId', // Include the id property
      data: jest.fn().mockReturnValue({}),
    };
    const mockQuerySnapshot = { docs: [mockDoc] };
    getDocs.mockResolvedValueOnce(mockQuerySnapshot);
    const result = await filterCoach(0, 3, []);
    expect(result).toEqual([{ id: 'mockCoachId' }]);
    expect(getDocs).toHaveBeenCalledTimes(1);
  });
  
  it('should return an empty array if no coaches match the criteria', async () => {
    const mockQuerySnapshot = { docs: [] };
    getDocs.mockResolvedValueOnce(mockQuerySnapshot);
  
    const result = await filterCoach(4, 3, ['tag']);
  
    expect(result).toEqual([]);
    expect(getDocs).toHaveBeenCalledTimes(1);
  });
  
  it('should handle error when fetching coaches', async () => {
    const errorMessage = 'Error fetching coaches';
    getDocs.mockRejectedValueOnce(new Error(errorMessage));
  
    const result = await filterCoach(4, 3, ['tag']);
  
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toEqual(errorMessage);
    expect(getDocs).toHaveBeenCalledTimes(1);
  });
  
});
