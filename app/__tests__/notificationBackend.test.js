import { expect, jest, describe, afterEach, it } from '@jest/globals';
import { db } from "@/lib/firebase";
import { collection, doc, getDocs, query } from "firebase/firestore";
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

    it('creates a new notification', async () => {
        // Setup mocks for this test case
        (retrieveData).mockResolvedValue('Player');
        (doc).mockReturnValue('docRef');

        // Call the function with test data
        await findOrCreateNotification('type', true);

        // Check if the Firestore functions were called correctly
        expect(retrieveData).toHaveBeenCalledWith('email');
        expect(retrieveData).toHaveBeenCalledWith('userType');

        expect(collection).toHaveBeenCalledWith(db, 'player');
        expect(query).toHaveBeenCalled();
        expect(getDocs).toHaveBeenCalled();
    });

});