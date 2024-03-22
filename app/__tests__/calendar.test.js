import { expect, jest, describe, it } from '@jest/globals';
import { getLessonsByCoachId } from '../../api/lesson-api';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, getDoc, } from "firebase/firestore";
import { addPlayerToLesson, removePlayerToLesson } from '@/api/lesson-api';
import * as lessonApi from '@/api/lesson-api';
jest.mock('@/api/lesson-api', () => {
    const originalModule = jest.requireActual('@/api/lesson-api');
    return {
        ...originalModule,
        getLessonById: jest.fn(),
    };
});
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
        doc: jest.fn(),
        getDoc: jest.fn(),
        updateDoc: jest.fn(),
    };
});
jest.mock('@/services/toast', () => ({
    fireToast: jest.fn(),
}));
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
const docSnap = {
    exists: jest.fn().mockReturnValue(true),
    data: jest.fn()
};

describe('addPlayerToLesson', () => {
    it('should add a player to a lesson', async () => {
        const lessonId = 'lesson123';
        const playerId = 'player456';
        getDoc.mockResolvedValue(docSnap);
        lessonApi.getLessonById.mockResolvedValue({ players: [] });

        await addPlayerToLesson(lessonId, playerId);
        expect(doc).toHaveBeenCalled()
    });
});

describe('removePlayerToLesson', () => {
    it('should remove a player from a lesson', async () => {
        const lessonId = 'lesson123';
        const playerId = 'player456';
        getDoc.mockResolvedValue(docSnap);

        lessonApi.getLessonById.mockResolvedValue({ players: [playerId] });

        await removePlayerToLesson(lessonId, playerId);
        expect(doc).toHaveBeenCalled()

    });
});
