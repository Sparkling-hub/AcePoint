import { expect, jest, describe, afterEach, it } from '@jest/globals';
import { db } from "@/lib/firebase";
import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { retrieveData } from "../../api/localStorage";
import { findOrCreateNotification } from "@/api/notification-api";
jest.mock("@/lib/firebase", () => ({
    db: {}
}));
jest.mock('../../api/localStorage', () => ({
    retrieveData: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    addDoc: jest.fn(),
    getDocs: jest.fn(() => Promise.resolve({ empty: true })),
    where: jest.fn(),
    query: jest.fn(),
    doc: jest.fn(),
    setDoc: jest.fn(),
}));
describe('findOrCreateNotification', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('creates a new notification for a player if none exists', async () => {
        // Setup mocks for this test case
        (retrieveData).mockResolvedValue('Player');
        (getDocs).mockResolvedValue({ empty: true });
        (doc).mockReturnValue('docRef');

        // Call the function with test data
        await findOrCreateNotification('userId', 'type', false);

        // Check if the Firestore functions were called correctly
        expect(retrieveData).toHaveBeenCalledWith('userType');
        expect(collection).toHaveBeenCalledWith(db, 'notification');
        expect(query).toHaveBeenCalled();
        expect(getDocs).toHaveBeenCalled();
        expect(setDoc).toHaveBeenCalledWith('docRef', {
            playerId: 'userId',
            type: 'type',
        });
    });

});