import { cureentUser } from '@/api/chat-api'; 
import { auth } from '@/lib/firebase';

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
jest.mock("@/lib/firebase", () => ({
    auth: {
        currentUser: null
    },
}));
describe('cureentUser function', () => {
    it('should return "User not authenticated." if currentUser is null', () => {
        expect(cureentUser()).toBe('User not authenticated.');
    });

    it('should return the UID if currentUser is not null', () => {
        // Mock currentUser to be an object with uid property
        auth.currentUser = { uid: 'someUID' };
        expect(cureentUser()).toBe('someUID');
    });
});