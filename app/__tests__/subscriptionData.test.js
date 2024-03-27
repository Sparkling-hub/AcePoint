import { subscriptionData } from '@/api/subscription-api';
import { retrieveData } from "@/api/localStorage";
import { getDocs } from "firebase/firestore";
jest.mock('@/api/localStorage', () => ({ retrieveData: jest.fn() }));
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
    getDocs: jest.fn(),
    collection: jest.fn(),
})); 
describe('subscriptionData function', () => {
    it('should return subscription data when user is authenticated and has a subscription', async () => {
        // Mock Firestore response
        const mockQuerySnapshot = [
            { id: '1', data: () => ({ coachId: 'user1' }) },
            { id: '2', data: () => ({ coachId: 'user2' }) },
        ];
        getDocs.mockResolvedValueOnce(mockQuerySnapshot);

        // Mock user data
        const mockUserData = JSON.stringify({ user: { uid: 'user1' } });
        retrieveData.mockResolvedValueOnce(mockUserData);

        const result = await subscriptionData();
        expect(result).toEqual({ data: { coachId: 'user2' }, subscriptionId: '1' });
    });

    it('should return "There is no subscription." when user is authenticated but has no subscription', async () => {
        // Mock Firestore response
        const mockQuerySnapshot = [{ id: '1', data: () => ({ coachId: 'user2' }) }];
        getDocs.mockResolvedValueOnce(mockQuerySnapshot);

        // Mock user data
        const mockUserData = JSON.stringify({ user: { uid: 'user1' } });
        retrieveData.mockResolvedValueOnce(mockUserData);

        const result = await subscriptionData();
        expect(result).toEqual({data:{ coachId: 'user2' },subscriptionId:null});
    });

    it('should return "User not authenticated" when user is not authenticated', async () => {
        // Mock user data as null
        retrieveData.mockResolvedValueOnce(null);

        const result = await subscriptionData();
        expect(result).toEqual("User not authenticated");
    });

    it('should return error message when an error occurs', async () => {
        // Mock error
        const errorMessage = "Firestore error";
        getDocs.mockRejectedValueOnce(new Error(errorMessage));

        const result = await subscriptionData();
        expect(result).toEqual(errorMessage);
    });
});