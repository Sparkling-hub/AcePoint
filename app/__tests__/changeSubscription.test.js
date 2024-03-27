import { changeSubscription } from '@/api/subscription-api';
import { retrieveData,storeData } from "@/api/localStorage";
import { setDoc,doc } from "firebase/firestore";
jest.mock('@/api/localStorage', () => ({ retrieveData: jest.fn(),storeData: jest.fn() }));
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
    setDoc: jest.fn(),
    doc: jest.fn(),
})); 
jest.mock("@/lib/firebase", () => ({
    db: {}
  }));
describe('changeSubscription function', () => {
    it('should return "User not authenticated." if no data is retrieved', async () => {
        // Mocking the retrieveData function to return null
        retrieveData.mockResolvedValueOnce(null);

        // Call the changeSubscription function
        const result = await changeSubscription({ subscription: 'exampleSubscription' });

        // Assert that the result is as expected
        expect(result).toBe('User not authenticated.');
    });
    it('should change subscription successfully', async () => {
        // Mocking the retrieveData function to return user data
        const userData = {
            data: {},
            user: { 
                uid: 'exampleUid'  
            }
        };
        retrieveData.mockResolvedValueOnce(JSON.stringify(userData));
        storeData.mockResolvedValueOnce();
        // Mock Firestore functions
        doc.mockReturnValueOnce('exampleDocRef');
        setDoc.mockResolvedValueOnce();
    
        // Call the changeSubscription function
        const result = await changeSubscription({ subscription: 'exampleSubscription' });
        // Assert that the result is as expected
        expect(result).toBe('subscription changed successfully');
        expect(retrieveData).toHaveBeenCalledWith('userInfo');
        expect(storeData).toHaveBeenCalledWith(
            'userInfo',
            JSON.stringify({ data: { subscription: 'exampleSubscription' },user:userData.user })
        );
    });

    it('should return error message if an error occurs during data retrieval or Firestore operation', async () => {
        // Mocking the retrieveData function to throw an error
        retrieveData.mockRejectedValueOnce(new Error('Error retrieving data'));

        // Call the changeSubscription function
        const result = await changeSubscription({ subscription: 'exampleSubscription' });

        // Assert that the result is as expected
        expect(result).toBe('Error retrieving data');
    });
});