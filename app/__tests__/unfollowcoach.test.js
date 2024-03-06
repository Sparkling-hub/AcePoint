import { unfavoriteCoach } from '@/api/player-api'; 
import { auth } from '@/lib/firebase';
import { getDoc,updateDoc,runTransaction } from 'firebase/firestore';
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
    updateDoc: jest.fn(),
    doc: jest.fn(),
    runTransaction: jest.fn(),
})); 

describe('unfavoriteCoach function', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Reset mock calls after each test
    });

    test('Coach removed from favorites successfully', async () => {
        const mockCurrentUser = { uid: 'user123' };
        const mockPlayerData = { favoriteCoach: ['coach/path'] };
        const mockCoachRef = { path: 'coach/path' };

        auth.currentUser = mockCurrentUser;
        getDoc.mockResolvedValue({ exists: jest.fn().mockReturnValue(true), data: jest.fn().mockReturnValue(mockPlayerData) });
        updateDoc.mockResolvedValue();

        const result = await unfavoriteCoach(mockCoachRef.path);
        expect(result).toBe('Player is not following the coach.');
    });

    test('Player does not exist', async () => {
        const mockCurrentUser = { uid: 'user123' };
        const mockCoachRef = { path: 'coach/path' };

        auth.currentUser = mockCurrentUser;
        getDoc.mockResolvedValue({ exists: jest.fn().mockReturnValue(false) });

        const result = await unfavoriteCoach(mockCoachRef);
        expect(result).toBe('There is no coach.');
    });

    test('User not authenticated', async () => {
        auth.currentUser = null;

        const result = await unfavoriteCoach({ path: 'coach/path' });
        expect(result).toBe('User not authenticated.');
    });

    test('Coach is not in the favorite list', async () => {
        const mockCurrentUser = { uid: 'user123' };
        const mockPlayerData = { favoriteCoach: ['another/coach/path'] }; // Different coach in the favorite list
        const mockCoachRef = { path: 'coach/path' };

        auth.currentUser = mockCurrentUser;
        getDoc.mockResolvedValue({ exists: jest.fn().mockReturnValue(true), data: jest.fn().mockReturnValue(mockPlayerData) });

        const result = await unfavoriteCoach(mockCoachRef);
        expect(result).toBe('Coach is not in the favorite list.');
    });
    test('Error handling in unfavoriteCoach function', async () => {
        // Mock data
        const mockCurrentUser = { uid: 'user123' };
        const mockCoachRef = 'coach123';
        const errorMessage = 'Firestore operation failed';
    
        // Mock auth.currentUser
        auth.currentUser = mockCurrentUser;
    
        // Mock Firestore methods
        const mockPlayerSnap = { exists: jest.fn().mockReturnValue(true), data: jest.fn().mockReturnValue({ favoriteCoach: ['coach123'], followedPlayer: ['user123'] }) };
        const mockCoachSnap = { exists: jest.fn().mockReturnValue(true), data: jest.fn().mockReturnValue({ followedPlayer: ['user123'] }) };
    
        // Mock getDoc to return playerSnap and coachSnap
        getDoc.mockResolvedValueOnce(mockPlayerSnap);
        getDoc.mockResolvedValueOnce(mockCoachSnap);
    
        // Mock updateDoc to throw an error
        runTransaction.mockRejectedValueOnce(new Error(errorMessage));
    
        // Call the function
        const result = await unfavoriteCoach(mockCoachRef);
    
        // Assertions
        expect(auth.currentUser).toBe(mockCurrentUser);
        expect(result).toBe(errorMessage);
    });
    
    
    
});
