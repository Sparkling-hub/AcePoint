import { favouriteCoach } from '@/api/player-api'; 
import { auth } from '@/lib/firebase';
import { getDoc ,runTransaction} from 'firebase/firestore';

jest.mock('firebase/auth', () => ({
    getReactNativePersistence: jest.fn(),
    initializeAuth: jest.fn(),
}));
jest.mock("@/lib/firebase", () => ({
    auth: jest.fn(),
}));
jest.mock('firebase/app', () => ({initializeApp: jest.fn(),}));
jest.mock('firebase/storage', () => ({getStorage: jest.fn(),}));
jest.mock('@react-native-async-storage/async-storage', () => ({ReactNativeAsyncStorage: jest.fn()}));
  
jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    getDoc: jest.fn(),
    doc: jest.fn(),
    runTransaction: jest.fn(),
})); 
describe('favouriteCoach function', () => {
    test('Player updated favourite Coach successfully', async () => {
        const mockCurrentUser = { uid: 'user123' };
        const mockPlayerData = { favoriteCoach: [] };
        const mockCoachRef = 'coachReference';
        auth.currentUser = mockCurrentUser;
        getDoc.mockResolvedValue({ exists: jest.fn().mockReturnValue(true), data: jest.fn().mockReturnValue(mockPlayerData) });
        runTransaction.mockResolvedValue();

        const result = await favouriteCoach(mockCoachRef);
        expect(result).toBe('Player updated favourite Coach successfully!');
    });

    test('Player does not exist', async () => {
        const mockCurrentUser = { uid: 'user123' };
        const mockCoachRef = 'coachReference';
        auth.currentUser = mockCurrentUser;
        getDoc.mockResolvedValue({ exists: jest.fn().mockReturnValue(false) });

        const result = await favouriteCoach(mockCoachRef);
        expect(result).toBe('There is no coach.');
    });

    test('User not authenticated', async () => {
        auth.currentUser = null;

        const result = await favouriteCoach('coachReference');
        expect(result).toBe('User not authenticated.');
    });

    test('Coach already exists in the favorite list', async () => {
        const mockCurrentUser = { uid: 'user123' };
        const mockPlayerData = { favoriteCoach: ['coachReference'], followedPlayer: ['user123']  };
        const mockCoachRef = 'coachReference';
        const mockCoachSnap = { exists: jest.fn().mockReturnValue(true), data: jest.fn().mockReturnValue({ followedPlayer: ['user123'] }) };

        auth.currentUser = mockCurrentUser;
        getDoc.mockResolvedValue({ exists: jest.fn().mockReturnValue(true), data: jest.fn().mockReturnValue(mockPlayerData) });
        getDoc.mockResolvedValue(mockCoachSnap);

        const result = await favouriteCoach(mockCoachRef);
        expect(result).toBe("Player already exists in coach's followed list.");
    });

    test('Error updating player', async () => {
        const mockCurrentUser = { uid: 'user123' };
        const mockPlayerData = { favoriteCoach: [] };
        const mockCoachRef = 'coachReference';
        const errorMessage = 'Some error message';

        auth.currentUser = mockCurrentUser;
        getDoc.mockResolvedValue({ exists: jest.fn().mockReturnValue(true), data: jest.fn().mockReturnValue(mockPlayerData) });
        runTransaction.mockRejectedValue(new Error(errorMessage));

        const result = await favouriteCoach(mockCoachRef);
        expect(result).toBe(errorMessage);
    });
});