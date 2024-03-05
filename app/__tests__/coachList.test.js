import { favoriteCoachList } from '@/api/player-api'
import { auth }  from'@/lib/firebase'; 
import { getDoc }  from'firebase/firestore'; 
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
  }));
  jest.mock("@/lib/firebase", () => ({
    auth: jest.fn(),
    getDoc: jest.fn(),
}));
  
describe('favoriteCoachList function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Reset mock calls after each test
    });
  it('should return "User not authenticated." if currentUser is null', async () => {
    auth.currentUser = null;

    const result = await favoriteCoachList();
    expect(result).toBe("User not authenticated.");
  });

  it('should return "Player does not exist." if playerSnap does not exist', async () => {
    auth.currentUser = { uid: 'someUserId' };
    getDoc.mockReturnValueOnce({ exists: () => false });

    const result = await favoriteCoachList();
    expect(result).toBe("Player does not exist.");
  });

  it('should return the list of favorite coaches if everything is okay', async () => {
    const playerData = {
      favoriteCoach: ['Coach A', 'Coach B']
    };
    auth.currentUser = { uid: 'someUserId' };
    getDoc.mockReturnValueOnce({ exists: () => true, data: () => playerData });

    const result = await favoriteCoachList();
    expect(result).toEqual(playerData.favoriteCoach);
  });

  it('should return the error message if an error occurs', async () => {
    const errorMessage = 'Some error occurred';
    auth.currentUser = { uid: 'someUserId' };
    getDoc.mockImplementationOnce(() => { throw new Error(errorMessage) });

    const result = await favoriteCoachList();

    expect(result).toBe(errorMessage);
  });
});
