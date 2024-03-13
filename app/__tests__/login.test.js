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
jest.mock('@react-native-async-storage/async-storage', () => ({}));
jest.mock('firebase/storage', () => ({
  ref: jest.fn(),
  getDownloadURL: jest.fn(),
  uploadBytesResumable: jest.fn(),
  getStorage: jest.fn()
}));
  
  import { jest, describe, it } from '@jest/globals';
  import { signin } from '@/api/auth-api';
  import { addDoc} from 'firebase/firestore';
  
  describe('loginUser', () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'password123';
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('logs in successfully with the correct email and password', async () => {
      addDoc.mockResolvedValue({ id: '123' });
  
      await signin({ email: mockEmail, password: mockPassword });
  
  
    });
  
    it('returns an error when login fails', async () => {
      const mockError = new Error('The password is invalid or the user does not have a password.');
      mockError.code = 'auth/password';
  
  
  
    });
  });