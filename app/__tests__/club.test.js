import { addClub } from '@/api/club-api';
import { retrieveData } from '@/api/localStorage';
import {  setDoc,collection,doc } from 'firebase/firestore'; 

jest.mock('firebase/auth', () => ({
    getReactNativePersistence: jest.fn(),
    initializeAuth: jest.fn(),
}));
jest.mock("@/lib/firebase", () => ({
    auth: {},
    
}));
jest.mock('firebase/app', () => ({initializeApp: jest.fn(),}));
jest.mock('@/api/localStorage', () => ({retrieveData: jest.fn(),}));
jest.mock('firebase/storage', () => ({getStorage: jest.fn(),}));
jest.mock('@react-native-async-storage/async-storage', () => ({ReactNativeAsyncStorage: jest.fn()}));
jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
}));
  
jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    doc: jest.fn(),
    setDoc: jest.fn(),
    collection: jest.fn(),
    Timestamp: {
        now: jest.fn(() => 'mockedTimestamp'),
      },
}));
describe('addClub', () => {
    it('should add a club successfully', async () => {
      // Mock retrieveData to return a coachId
      retrieveData.mockResolvedValueOnce('mockCoachId');
  
      // Mock setDoc
      setDoc.mockResolvedValueOnce();
  
      // Define mock club data
      const mockClub = {
        name: 'Mock Club',
        latitude: 123.456,
        longitude: 789.123,
      };
      const docRef = { id: 'mockDocId' };
      doc.mockReturnValueOnce(docRef);
      // Call addClub function
      const result = await addClub({ club: mockClub });
      // Assertions
      expect(result).toBeDefined();
      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          name: mockClub.name,
          latitude: mockClub.latitude,
          longitude: mockClub.longitude,
          createdAt: 'mockedTimestamp',
        })
      );
    });
  
    it('should handle club addition failure', async () => {
      // Mock retrieveData to return a coachId
      retrieveData.mockResolvedValueOnce('mockCoachId');
  
      // Mock setDoc to throw an error
      const errorMessage = 'Mocked error message';
      setDoc.mockRejectedValueOnce(new Error(errorMessage));
  
      // Define mock club data
      const mockClub = {
        name: 'Mock Club',
        latitude: 123.456,
        longitude: 789.123,
      };
      const result = await addClub({ club: mockClub });
      // Call addClub function
       expect(result).toBe(errorMessage);
    });
  });