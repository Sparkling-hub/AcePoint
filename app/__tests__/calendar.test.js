import { expect, jest, describe, it } from '@jest/globals';
import { getLessonsByCoachId } from '../../api/lesson-api';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
jest.mock('@/lib/firebase', () => {
    return {
        db: jest.fn(),
    };
});
jest.mock('@react-native-async-storage/async-storage', () => ({ ReactNativeAsyncStorage: jest.fn() }));

// Mocking the Firestore functions
jest.mock('firebase/firestore', () => {
    return {
        collection: jest.fn(),
        query: jest.fn(),
        where: jest.fn(),
        getDocs: jest.fn(),
    };
});

describe('getLessonsByCoachId', () => {
    it('fetches lessons successfully', async () => {
        await getLessonsByCoachId();
        expect(collection).toHaveBeenCalledWith(db, 'lesson');
        expect(query).toHaveBeenCalled();
        expect(where).toHaveBeenCalled();
        expect(getDocs).toHaveBeenCalled();
    });

    it('handles errors gracefully', async () => {
        const mockGetDocs = getDocs;
        mockGetDocs.mockRejectedValue(new Error('Error getting lessons'));

        const lessons = await getLessonsByCoachId();

        expect(lessons).toEqual([]);
    });
});
