import React from 'react';
import { useAuthIos } from '@/services/auth';
import { signInWithCredential } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { render, waitFor } from 'react-native-testing-library';

import GoogleAuthIOS from '@/components/GoogleAuthIOS';

jest.mock('react-native-gesture-handler', () => {
  jest.fn();
});
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(() => Promise.resolve({ empty: true })),
  where: jest.fn(),
  query: jest.fn(),
}));
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
  Button: 'Button',
  StyleSheet: {
    create: () => ({}),
  }
}));

jest.mock('@/services/auth', () => ({
  useAuthIos: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  GoogleAuthProvider: {
    credential: jest.fn(),
  },
  signInWithCredential: jest.fn(),
  initializeAuth: jest.fn(),
  getReactNativePersistence: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

jest.mock('@/services/user', () => jest.fn());
jest.mock('firebase/storage', () => ({
  ref: jest.fn(),
  getDownloadURL: jest.fn(),
  uploadBytesResumable: jest.fn(),
  getStorage: jest.fn(),
}));
jest.mock('tamagui', () => ({
  Button: jest.fn().mockImplementation(() => <button>Mocked Button</button>),
  Image: jest.fn().mockImplementation(() => <img src="mocked.png" alt="Mocked" />)
}));

describe('GoogleAuthIOS', () => {
  const mockResponse = {
    type: 'success',
    params: {
      id_token: 'mockIdToken',
    },
  };

  beforeEach(() => {
    useAuthIos.mockReturnValue({
      response: mockResponse,
      promptAsync: jest.fn(),
    });

    signInWithCredential.mockResolvedValue({
      user: {
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: 'http://example.com/photo.jpg',
      },
    });

    jest.clearAllMocks();
  });

  it('calls signInWithCredential on successful response', async () => {
    render(<GoogleAuthIOS />);

    await waitFor(() => {
      expect(signInWithCredential).toHaveBeenCalled();
    });
  });

  it('stores user data in AsyncStorage on successful authentication', async () => {
    render(<GoogleAuthIOS />);

    await waitFor(() => {
      expect(ReactNativeAsyncStorage.setItem).toHaveBeenCalledWith(
        'username',
        'Test User'
      );
      expect(ReactNativeAsyncStorage.setItem).toHaveBeenCalledWith(
        'email',
        'test@example.com'
      );
      expect(ReactNativeAsyncStorage.setItem).toHaveBeenCalledWith(
        'image',
        'http://example.com/photo.jpg'
      );
    });
  });



  it('displays an error alert if authentication fails', async () => {
    signInWithCredential.mockRejectedValue(new Error('Something went wrong!'));
    render(<GoogleAuthIOS />);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error : ',
        'Something went wrong !'
      );
    });
  });
});
