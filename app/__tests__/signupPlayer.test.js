import { signUpPlayer } from '@/api/auth-api';
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
describe('signUpPlayer', () => {
    it('should sign up a player successfully', async () => {
      // Mock successful createUserWithEmailAndPassword
      createUserWithEmailAndPassword.mockResolvedValueOnce({
        user: { uid: 'mockUid' },
      });
  
      // Mock successful setDoc
      setDoc.mockResolvedValueOnce();
  
      // Define mock player data
      const mockPlayer = {
        displayName: 'Mock Player',
        phoneNumber: '+44123456789',
        terms: true,
        marketing: false,
        gender: 'Male',
        fitness: 'Normal',
        age: '3/17/2005',
        tennisLevel: 'Beginner',
      };
  
      // Call signUpPlayer function
      const result = await signUpPlayer({
        email: 'test@example.com',
        password: 'password',
        player: mockPlayer,
      });
  
      // Assertions
      expect(result).toEqual('Player added successfully');
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        db,
        'test@example.com',
        'password'
      );
      expect(signOut).toHaveBeenCalledWith(mockAuth);
    });
  
    it('should handle sign up failure', async () => {
      // Mock failed createUserWithEmailAndPassword
      const errorMessage = 'Mocked error message';
      createUserWithEmailAndPassword.mockRejectedValueOnce({
        message: errorMessage,
      });
  
      // Define mock player data
      const mockPlayer = {
        displayName: 'Mock Player',
        phoneNumber: '+44123456789',
        terms: true,
        marketing: false,
        gender: 'Male',
        fitness: 'Normal',
        age: '3/17/2005',
        tennisLevel: 'Beginner',
      };
  
      // Call signUpPlayer function
      const result = await signUpPlayer({
        email: 'test@example.com',
        password: 'password',
        player: mockPlayer,
      });
  
      // Assertions
      expect(result).toEqual(`Sign Up Failed ${errorMessage}`);
      expect(setDoc).not.toHaveBeenCalled();
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        db,
        'test@example.com',
        'password'
      );
      expect(signOut).toHaveBeenCalledWith(mockAuth);
    });
  
    it('should handle missing player fields', async () => {
      // Mock successful createUserWithEmailAndPassword
      createUserWithEmailAndPassword.mockResolvedValueOnce({
        user: { uid: 'mockUid' },
      });
  
      // Mock successful setDoc
      setDoc.mockResolvedValueOnce();
  
      // Define mock player data with missing fields
      const mockPlayer = {
        displayName: 'Mock Player',
        phoneNumber: '+44123456789',
        // Missing fields: terms, marketing, gender, fitness, age, tennisLevel
      };
  
      // Call signUpPlayer function
      const result = await signUpPlayer({
        email: 'test@example.com',
        password: 'password',
        player: mockPlayer,
      });
  
      // Assertions
      expect(result).toEqual('Player added successfully');
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        db,
        'test@example.com',
        'password'
      );
      expect(signOut).toHaveBeenCalledWith(mockAuth);
    });
  });