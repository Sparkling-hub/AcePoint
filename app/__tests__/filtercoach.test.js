import { filterCoach } from '@/api/player-api'
import { getDocs } from 'firebase/firestore'
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
jest.mock('firebase/app', () => ({initializeApp: jest.fn(),}));
jest.mock('firebase/storage', () => ({getStorage: jest.fn(),}));
jest.mock('@react-native-async-storage/async-storage', () => ({ReactNativeAsyncStorage: jest.fn()}));
describe('filterCoach function', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return "no data" if no coaches are found', async () => {
      const mockQuerySnapshot = { docs: [] };
      getDocs.mockResolvedValueOnce(mockQuerySnapshot);
  
      const result = await filterCoach(4, 3, 'tag');
  
      expect(result).toEqual([]);
      expect(getDocs).toHaveBeenCalledTimes(1);
    });
  
    it('should return coaches that match the given criteria', async () => {
      const mockDoc1 = { id: 'coach1', data: () => ({ tags: 'tag1', rating: 4, level: 3 }) };
      const mockDoc2 = { id: 'coach2', data: () => ({ tags: 'tag2', rating: 4, level: 3 }) };
      const mockQuerySnapshot = { docs: [mockDoc1, mockDoc2] };
      getDocs.mockResolvedValueOnce(mockQuerySnapshot);
  
      const result = await filterCoach(4, 3, 'tag1');
  
      expect(result).toEqual([{ id: 'coach1', tags: 'tag1', rating: 4, level: 3 }]);
      expect(getDocs).toHaveBeenCalledTimes(1);
    });
  
    it('should handle case-insensitive tag matching', async () => {
      const mockDoc1 = { id: 'coach1', data: () => ({ tags: 'Tag1', rating: 4, level: 3 }) };
      const mockQuerySnapshot = { docs: [mockDoc1] };
      getDocs.mockResolvedValueOnce(mockQuerySnapshot);
  
      const result = await filterCoach(4, 3, 'tag1');
  
      expect(result).toEqual([{ id: 'coach1', tags: 'Tag1', rating: 4, level: 3 }]);
      expect(getDocs).toHaveBeenCalledTimes(1);
    });
});