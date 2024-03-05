import { favoriteCoachList } from '@/api/player-api'
import { auth }  from'@/lib/firebase'; 
import { getDoc,getDocs }  from'firebase/firestore'; 
jest.mock('firebase/auth', () => ({
    getReactNativePersistence: jest.fn(),
    initializeAuth: jest.fn(),
  }));

  jest.mock('firebase/app', () => ({initializeApp: jest.fn(),}));
  jest.mock('firebase/storage', () => ({getStorage: jest.fn(),}));
  jest.mock('@react-native-async-storage/async-storage', () => ({ReactNativeAsyncStorage: jest.fn()}));
  
  jest.mock('firebase/firestore', () => ({
      getFirestore: jest.fn(),
      collection: jest.fn(),
      doc: jest.fn(),
      getDoc: jest.fn(),
      getDocs: jest.fn(),
  }));
  jest.mock("@/lib/firebase", () => ({
    auth: jest.fn(),
}));
describe('favoriteCoachList function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('should return "User not authenticated." when currentUser is not defined', async () => {
      auth.currentUser = null;
      const result = await favoriteCoachList();
      expect(result).toBe("User not authenticated.");
    });
  
    test('should return "Player does not exist." when player does not exist', async () => {
        const mockCurrentUser = { uid: 'user123' };
        auth.currentUser = mockCurrentUser;
      getDoc.mockResolvedValueOnce({ exists: () => false,data:()=>null });
      const result = await favoriteCoachList();
      expect(result).toBe("Player does not exist.");
    });
  
    test('should handle error if fetching coach data fails', async () => {
      const playerData = {
        favoriteCoach: ['coachId1']
      };
      getDoc.mockResolvedValueOnce({ exists: () => true, data: () => playerData });
  
      getDocs.mockRejectedValueOnce(new Error('Error fetching coach data'));
  
      const result = await favoriteCoachList();
      expect(result[0]).toBeNull();
    });
  });
