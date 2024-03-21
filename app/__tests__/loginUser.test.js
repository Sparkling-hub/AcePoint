import { loginUser } from '@/api/auth-api';
import {  getDoc } from 'firebase/firestore'; 
import {  signInWithEmailAndPassword, signOut } from 'firebase/auth'; 

jest.mock('firebase/auth', () => ({
    getReactNativePersistence: jest.fn(),
    initializeAuth: jest.fn(),
  }));
  jest.mock("@/lib/firebase", () => ({
    auth: {}
  }));
  jest.mock('firebase/app', () => ({initializeApp: jest.fn(),}));
  jest.mock('firebase/storage', () => ({getStorage: jest.fn(),}));
  jest.mock('@react-native-async-storage/async-storage', () => ({ReactNativeAsyncStorage: jest.fn()}));
jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  }));
  
  jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn(),
  }));
  
  describe('loginUser function', () => {
    afterEach(() => {
      jest.clearAllMocks(); // Clear mock calls after each test
    });
  
    it('should login coach and return user and coachData', async () => {
      // Mock Firestore snapshot
      const coachSnap = { exists: jest.fn().mockReturnValue(true), data: jest.fn().mockReturnValue({ data: 'mockCoachData' }) };
      getDoc.mockResolvedValue(coachSnap);
      // Mock Firebase authentication
      signInWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: 'mockUid' } });
      const result = await loginUser({ email: 'coach@example.com', password: 'passworduser123', usertype: 'Coach' });
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'coach@example.com', 'passworduser123');
      expect(signOut).not.toHaveBeenCalled();
      expect(result).toEqual({
        user: { user: { uid: 'mockUid' } },
        data: { data: 'mockCoachData' }
      });
    });
  
    it('should login player and return user and playerData', async () => {
      // Mock Firestore snapshot
      const playerSnap = { exists: jest.fn().mockReturnValue(true), data: jest.fn().mockReturnValue({ data: 'mockPlayerData' }) };
      getDoc.mockResolvedValue(playerSnap);
  
      // Mock Firebase authentication
      signInWithEmailAndPassword.mockResolvedValueOnce({ user: { uid: 'mockUid' } });
  
      const result = await loginUser({ email: 'player@example.com', password: 'passworduser123', usertype: 'Player' });
  
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'player@example.com', 'passworduser123');
      expect(signOut).not.toHaveBeenCalled();
      expect(result).toEqual({ user: { user: { uid: 'mockUid' } }, data: { data: 'mockPlayerData' } });
    });
  
    it('should handle error', async () => {
      // Mock Firebase authentication error
      signInWithEmailAndPassword.mockRejectedValueOnce('Login error');
  
      const result = await loginUser({ email: 'invalid@example.com', password: 'passworduser123', usertype: 'Player' });
  
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'invalid@example.com', 'passworduser123');
      expect(result).toEqual('Login error');
    });
  });