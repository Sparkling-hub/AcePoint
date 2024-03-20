import { subscriptionData } from '@/api/subscription-api';
import { retrieveData } from "@/api/localStorage";
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
})); 
describe('subscriptionData function', () => {
    it('should return "User not authenticated" if no data is retrieved', async () => {
        // Mocking the retrieveData function to return null
        retrieveData.mockResolvedValueOnce(null);

        // Call the subscriptionData function
        const result = await subscriptionData();

        // Assert that the result is as expected
        expect(result).toBe('User not authenticated');
    });

    it('should return "subscription is not exist" if subscription data does not exist', async () => {
        // Mocking the retrieveData function to return data without subscription
        retrieveData.mockResolvedValueOnce(JSON.stringify({ coachData: {}}));

        // Call the subscriptionData function
        const result = await subscriptionData();

        // Assert that the result is as expected
        expect(result).toBe('subscription is not exist');
    });
    it('should return error message if an error occurs during data retrieval', async () => {
        // Mocking the retrieveData function to throw an error
        retrieveData.mockRejectedValueOnce(new Error('Error retrieving data'));

        // Call the subscriptionData function
        const result = await subscriptionData();
        // Assert that the result is as expected
        expect(result).toBe('Error retrieving data');
    });
    it('should return subscription data if it exists', async () => {
        // Mocking the retrieveData function to return data with subscription
        retrieveData.mockResolvedValueOnce(JSON.stringify({ coachData: { subscription: 'exampleSubscription'} }));

        // Call the subscriptionData function
        const result = await subscriptionData();
        // Assert that the result is as expected
        expect(result).toBe('exampleSubscription');
        expect(retrieveData).toHaveBeenCalledWith('userInfo');
    });

   
});