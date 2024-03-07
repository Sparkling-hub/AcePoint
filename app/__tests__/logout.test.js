import { handleLogout } from '@/components/auth/Logout';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';

jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
    removeItem: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
    ref: jest.fn(),
    getDownloadURL: jest.fn(),
    uploadBytesResumable: jest.fn(),
    getStorage: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    addDoc: jest.fn(),
    getDocs: jest.fn(() => Promise.resolve({ empty: true })),
    where: jest.fn(),
    query: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
    GoogleAuthProvider: {
        credential: jest.fn(),
    },
    signOut: jest.fn(),
    signInWithCredential: jest.fn(),
    initializeAuth: jest.fn(),
    getReactNativePersistence: jest.fn(),
}));
jest.mock('expo-router', () => ({
    router: {
        push: jest.fn(),
    },
}));
describe('handleLogout', () => {
    it('should call removeItem with correct keys and signOut, then navigate to login', async () => {
        await handleLogout();

        expect(ReactNativeAsyncStorage.removeItem).toHaveBeenCalledWith('email');
        expect(ReactNativeAsyncStorage.removeItem).toHaveBeenCalledWith('image');
        expect(ReactNativeAsyncStorage.removeItem).toHaveBeenCalledWith('username');
        expect(ReactNativeAsyncStorage.removeItem).toHaveBeenCalledWith('userID');

        expect(ReactNativeAsyncStorage.removeItem).toHaveBeenCalledWith('userInfo');

        expect(signOut).toHaveBeenCalled();

        expect(router.push).toHaveBeenCalledWith('/');

        jest.resetAllMocks();
    });
});