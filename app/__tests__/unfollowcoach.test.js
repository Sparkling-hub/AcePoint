import { unfavoriteCoach } from '@/api/player-api'; 
import { auth } from '@/lib/firebase';
import { getDoc,updateDoc } from 'firebase/firestore';
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
        expect(result).toBe('Coach removed from favorites successfully!');
    });

    test('Player does not exist', async () => {
        const mockCurrentUser = { uid: 'user123' };
        const mockCoachRef = { path: 'coach/path' };

        auth.currentUser = mockCurrentUser;
        getDoc.mockResolvedValue({ exists: jest.fn().mockReturnValue(false) });

        const result = await unfavoriteCoach(mockCoachRef);
        expect(result).toBe('Player does not exist.');
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
        const mockCoachRef = { path: 'coach/path' };
        const errorMessage = 'Firestore operation failed';
    
        // Set up mocks
        auth.currentUser = mockCurrentUser;
        getDoc.mockResolvedValue({ exists: jest.fn().mockReturnValue(true), data: jest.fn().mockReturnValue({ favoriteCoach: ['coach/path'] }) });
        updateDoc.mockRejectedValue(new Error(errorMessage));
    
        // Call the function
        const result = await unfavoriteCoach(mockCoachRef.path);
        // Assertions
        expect(result).toBe(errorMessage);
        expect(auth.currentUser).toBe(mockCurrentUser);

    });
    
    
});
