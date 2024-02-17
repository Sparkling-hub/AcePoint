import { expect, jest, describe, afterEach, it } from '@jest/globals';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { authAndroid } from '@/services/auth';

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
}));
jest.mock('@react-native-google-signin/google-signin', () => ({
    GoogleSignin: {
        configure: jest.fn(),
        hasPlayServices: jest.fn(() => Promise.resolve()),
        signIn: jest.fn(() => Promise.resolve({ idToken: 'mock-id-token' })),
    },
}));

jest.mock('@react-native-firebase/auth', () => {
    const mockSignInWithCredential = jest.fn();
    mockSignInWithCredential.mockResolvedValue({
      user: {},
    });
    const authInstanceMock = {
      signInWithCredential: mockSignInWithCredential,
    };
    const authMock = jest.fn(() => authInstanceMock);
    authMock.GoogleAuthProvider = {
      credential: jest.fn(),
    };
    return authMock;
  });
jest.mock('react-native', () => ({
    Alert: { alert: jest.fn() },
}));
jest.mock('@/services/user', () => jest.fn());
jest.mock("expo-auth-session/build/providers/Google", () => ({
    useAuthRequest: jest.fn(),
  }));
describe('signIn process', () => {
    const idToken = 'mock-id-token';

    it('should complete the sign-in process successfully', async () => {
        await authAndroid(); 
        expect(GoogleSignin.hasPlayServices).toHaveBeenCalled();
        expect(GoogleSignin.signIn).toHaveBeenCalled();
        expect(auth.GoogleAuthProvider.credential).toHaveBeenCalledWith(idToken);
        expect(auth().signInWithCredential).toHaveBeenCalled();
    });

    it('should handle errors during the sign-in process', async () => {
        const error = new Error('Something went wrong !');
        auth().signInWithCredential.mockRejectedValueOnce(error);
        await authAndroid(); 
        expect(Alert.alert).toHaveBeenCalledWith('Error : ', 'Something went wrong !');
    });
});

afterEach(() => {
    jest.clearAllMocks();
});