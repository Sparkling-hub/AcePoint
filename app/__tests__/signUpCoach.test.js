import { signUpCoach } from '@/api/auth-api';
import { createUserWithEmailAndPassword, setDoc ,signOut} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
jest.mock('firebase/auth', () => ({
    getReactNativePersistence: jest.fn(),
    initializeAuth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    setDoc: jest.fn(),
    signOut: jest.fn(),
  }));
jest.mock('firebase/app', () => ({initializeApp: jest.fn(),}));
jest.mock('firebase/storage', () => ({getStorage: jest.fn(),}));
jest.mock('@react-native-async-storage/async-storage', () => ({ReactNativeAsyncStorage: jest.fn()}));
// Mock Firebase functions
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  Timestamp: {
    now: jest.fn(() => 1234567890), // Mock the Timestamp.now() method
  },
}));

// Mock Firebase auth and Firestore instances
const mockAuth = auth;
const mockDb = db;

describe('signUpCoach', () => {
    it('should sign up a coach successfully', async () => {
      // Mock the successful createUserWithEmailAndPassword response
      createUserWithEmailAndPassword.mockResolvedValueOnce({
        user: { uid: 'mockUid' },
      });
  
      // Mock Firestore setDoc function
      setDoc.mockResolvedValueOnce();
  
      // Define mock coach data
      const mockCoach = {
        displayName: 'Mock Coach',
        phoneNumber: '1234567890',
        terms: true,
        marketing: false,
        image: 'mockImageURL',
        tags: ['tag1', 'tag2'],
        bios: 'Mock bio',
        clubId: 'mockClubId',
      };
  
      // Call signUpCoach function
      const result = await signUpCoach({
        email: 'test@example.com',
        password: 'password',
        coach: mockCoach,
      });
  
      expect(result).toEqual('User with coach added successfully');
      // Verify createUserWithEmailAndPassword is called with correct arguments
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        mockAuth,
        'test@example.com',
        'password'
      );
      // Verify signOut is called
      expect(signOut).toHaveBeenCalledWith(mockAuth);
    });
  
    it('should handle sign up failure', async () => {
      // Mock the failed createUserWithEmailAndPassword response
      const errorMessage = 'Mocked error message';
      createUserWithEmailAndPassword.mockRejectedValueOnce({
        message: errorMessage,
      });
  
      // Define mock coach data
      const mockCoach = {
        displayName: 'Mock Coach',
        phoneNumber: '1234567890',
        terms: true,
        marketing: false,
        image: 'mockImageURL',
        tags: ['tag1', 'tag2'],
        bios: 'Mock bio',
        clubId: 'mockClubId',
      };
  
      // Call signUpCoach function
      const result = await signUpCoach({
        email: 'test@example.com',
        password: 'password',
        coach: mockCoach,
      });
  
      // Verify the result
      expect(result).toEqual(`Sign Up Failed ${errorMessage}`);
  
      // Verify createUserWithEmailAndPassword is called with correct arguments
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        mockAuth,
        'test@example.com',
        'password'
      );
  
      // Verify setDoc is not called
      expect(setDoc).not.toHaveBeenCalled();
      });
  
    it('should handle missing clubId', async () => {
      // Mock the successful createUserWithEmailAndPassword response
      createUserWithEmailAndPassword.mockResolvedValueOnce({
        user: { uid: 'mockUid' },
      });
  
      // Mock Firestore setDoc function
      setDoc.mockResolvedValueOnce();
  
      // Define mock coach data with missing clubId
      const mockCoach = {
        displayName: 'Mock Coach',
        phoneNumber: '1234567890',
        terms: true,
        marketing: false,
        image: 'mockImageURL',
        tags: ['tag1', 'tag2'],
        bios: 'Mock bio',
      };
  
      // Call signUpCoach function
      await signUpCoach({
        email: 'test@example.com',
        password: 'password',
        coach: mockCoach,
      });
    });
  });
  