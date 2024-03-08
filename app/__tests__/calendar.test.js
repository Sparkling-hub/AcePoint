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
const mockLessons = [{ id: '1', name: 'Lesson 1' }, { id: '2', name: 'Lesson 2' }];
const mockGetDocs = getDocs;

const mockForEachImplementation = callback => {
    mockLessons.forEach(lesson => callback({ id: lesson.id, data: () => lesson }));
};

mockGetDocs.mockResolvedValue({
    forEach: jest.fn().mockImplementation(mockForEachImplementation),
});

describe('getLessonsByCoachId', () => {
    it('fetches lessons successfully', async () => {

        const lessons = await getLessonsByCoachId();

        expect(collection).toHaveBeenCalledWith(db, 'lesson');
        expect(query).toHaveBeenCalled();
        expect(where).toHaveBeenCalled();
        expect(getDocs).toHaveBeenCalled();
        expect(lessons).toEqual(mockLessons.map(lesson => ({ id: lesson.id, ...lesson })));
    });

    it('handles errors gracefully', async () => {
        const mockGetDocs = getDocs;
        mockGetDocs.mockRejectedValue(new Error('Error getting lessons'));

        const lessons = await getLessonsByCoachId();

        expect(lessons).toEqual([]);
    });
});
