import { findAllFromCollection } from '@/api/chat-api'; 
import { getDocs } from 'firebase/firestore'; 

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
    doc: jest.fn(),
    collection: jest.fn(),
    getDocs: jest.fn(),
    getDoc: jest.fn(),
})); 
jest.mock("@/lib/firebase", () => ({
    db: jest.fn(),
}));
describe('findAllFromCollection function', () => {
    it('should return an array of documents when collection exists', async () => {
        const mockQuerySnapshot = {
            forEach: jest.fn((callback) => {
                callback({ id: 'documentId', data: () => ({ some: 'data' }) });
            })
        };
        getDocs.mockResolvedValueOnce(mockQuerySnapshot);

        const result = await findAllFromCollection('someCollection');
        expect(result).toEqual([{ id: 'documentId', some: 'data' }]);
    });

    it('should return an error message when collection does not exist', async () => {
        getDocs.mockRejectedValueOnce(new Error('Collection not found'));

        const result = await findAllFromCollection('nonExistentCollection');
        expect(result).toBe('Collection not found');
    });
});

