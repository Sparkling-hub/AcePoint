jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
    initializeAuth: jest.fn(),
    getReactNativePersistence: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    addDoc: jest.fn(),
    getDocs: jest.fn(() => Promise.resolve({ empty: true })),
    where: jest.fn(),
    query: jest.fn(),
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
        replace: jest.fn(),
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
    getStorage: jest.fn(),
}));
jest.mock("react-native-toast-message", () => ({
    __esModule: true,
    default: {
        show: jest.fn()
    }
}));
import { expect, jest, describe, afterEach, it } from '@jest/globals';
import { findConnectedUserByEmail } from '@/services/user';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

describe('findUserByEmail', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should find user by email', async () => {
        getDocs.mockResolvedValue({ empty: true });
        addDoc.mockResolvedValue({ id: '123' });
        const email = 'test@example.com';
        const playerDocument = { exists: jest.fn() };
        const coachDocument = { exists: jest.fn() };
        const playerQuerySnapshot = {
            docs: [
                playerDocument,  // Include the document that exists
                coachDocument   // Assuming coachDocument doesn't exist
            ]
        };
        const coachQuerySnapshot = { docs: [coachDocument] };

        // Mock Firebase Firestore functions
        query.mockReturnValueOnce({});
        collection.mockReturnValueOnce({});
        where.mockReturnValueOnce({});
        getDocs.mockResolvedValueOnce(playerQuerySnapshot);
        getDocs.mockResolvedValueOnce(coachQuerySnapshot);
        await findConnectedUserByEmail();
        expect(query).toHaveBeenCalledWith(collection(db, 'player'), where('email', '==', email))
        expect(query).toHaveBeenCalledWith(collection(db, 'coach'), where('email', '==', email))

    });

});
