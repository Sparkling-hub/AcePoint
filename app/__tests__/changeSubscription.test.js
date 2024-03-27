import { changeSubscription } from '@/api/subscription-api';
import { retrieveData } from "@/api/localStorage";
import { setDoc } from "firebase/firestore";
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
    it('should change subscription successfully when user is authenticated', async () => {
        // Mock user data
        const mockUserData = JSON.stringify({ user: { uid: 'user1' } });
        retrieveData.mockResolvedValueOnce(mockUserData);

        // Mock Firestore response
        setDoc.mockResolvedValueOnce();

        const result = await changeSubscription({ subscription: { /* your subscription data */ }, id: 'subscriptionId' });
        expect(result).toEqual("subscription changed successfully");
    });

    it('should return "User not authenticated" when user is not authenticated', async () => {
        // Mock user data as null
        retrieveData.mockResolvedValueOnce(null);

        const result = await changeSubscription({ subscription: { /* your subscription data */ }, id: 'subscriptionId' });
        expect(result).toEqual("User not authenticated.");
    });

    it('should return error message when an error occurs', async () => {
        // Mock user data
        const mockUserData = JSON.stringify({ user: { uid: 'user1' } });
        retrieveData.mockResolvedValueOnce(mockUserData);

        // Mock error
        const errorMessage = "Firestore error";
        setDoc.mockRejectedValueOnce(new Error(errorMessage));

        const result = await changeSubscription({ subscription: { /* your subscription data */ }, id: 'subscriptionId' });
        expect(result).toEqual(errorMessage);
    });
});