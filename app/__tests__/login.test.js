jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(),
  }));
  jest.mock('firebase/auth', () => ({
    initializeAuth: jest.fn(),
    getReactNativePersistence: jest.fn(),
    signInWithEmailAndPassword:jest.fn().mockImplementation(() => Promise.resolve()),
  
  }));
  jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    addDoc: jest.fn(),
    getDocs: jest.fn(() => Promise.resolve({ empty: true })),
    where: jest.fn(),
    query: jest.fn(),
    setDoc: jest.fn(),
    doc: jest.fn(),
  }));
  jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }));
  jest.mock('expo-router', () => ({
    router: {
      push: jest.fn(),
    },
  }));
  jest.mock('react-native', () => ({
    Alert: {
      alert: jest.fn(),
    },
  }));
  jest.mock('firebase/storage', () => ({
    ref: jest.fn(),
    getDownloadURL: jest.fn(),
    uploadBytesResumable: jest.fn(),
    getStorage: jest.fn()
  }));
  
  import { expect, jest, describe, afterEach, it } from '@jest/globals';
  import { signin } from '@/api/auth-api';
  import { addDoc} from 'firebase/firestore';
  import { auth,signInWithEmailAndPassword } from '@/lib/firebase';
  
  describe('loginUser', () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'password123';
  
    beforeEach(() => {
      // Clear all mock calls
      jest.clearAllMocks();
    });
  
    it('logs in successfully with the correct email and password', async () => {
      addDoc.mockResolvedValue({ id: '123' });
  
      const response = await signin({ email: mockEmail, password: mockPassword });
      // Since signInWithEmailAndPassword is a named export, we mock it like this.
      //signInWithEmailAndPassword.mockResolvedValue(mockUser);
  
  
      expect(signInWithEmailAndPassword).toBeCalledWith(auth, mockEmail,mockPassword)
      //expect(response).toEqual({ user: mockUser });
    });
  
    it('returns an error when login fails', async () => {
      const mockError = new Error('The password is invalid or the user does not have a password.');
      mockError.code = 'auth/PASSWORD-password';
  
      signInWithEmailAndPassword.mockRejectedValue(mockError);
  
      await expect(signin({ email: mockEmail, password: 'PASSWORDPassword' })).rejects.toThrow(mockError);
  
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, mockEmail, 'PASSWORD');
    });
  });