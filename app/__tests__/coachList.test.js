import { favoriteCoachList, getPlayerById } from '@/api/player-api';
import { getCoachById } from '@/api/coach-api';
import {
  storeLesson,
  getLessonById,
  updateLesson,
  deleteLessonById,
} from '@/api/lesson-api';
import { auth, db } from '@/lib/firebase';
import {
  getDoc,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import fireToast from '@/services/toast';

jest.mock('@/services/toast', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});
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
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));
jest.mock('@/lib/firebase', () => ({
  auth: jest.fn(),
}));
describe('favoriteCoachList function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should return "User not authenticated." when currentUser is not defined', async () => {
    auth.currentUser = null;
    const result = await favoriteCoachList();
    expect(result).toBe('User not authenticated.');
  });

  test('should return "Player does not exist." when player does not exist', async () => {
    const mockCurrentUser = { uid: 'user123' };
    auth.currentUser = mockCurrentUser;
    getDoc.mockResolvedValueOnce({ exists: () => false, data: () => null });
    const result = await favoriteCoachList();
    expect(result).toBe('Player does not exist.');
  });

  test('should handle error if fetching coach data fails', async () => {
    const playerData = {
      favoriteCoach: ['coachId1'],
    };
    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => playerData,
    });

    getDocs.mockRejectedValueOnce(new Error('Error fetching coach data'));

    const result = await favoriteCoachList();
    expect(result[0]).toBeNull();
  });
});

describe('getCoachById', () => {
  it('returns coach data if document exists', async () => {
    // Setup
    const fakeId = '123';
    const fakeCoachData = { name: 'John Doe', specialty: 'Fitness' };
    const docSnapMock = {
      exists: jest.fn().mockReturnValue(true),
      data: jest.fn().mockReturnValue(fakeCoachData),
    };
    getDoc.mockResolvedValue(docSnapMock);

    // Execute
    const result = await getCoachById(fakeId);

    // Assert
    expect(doc).toHaveBeenCalledWith(db, 'coach', fakeId);
    expect(getDoc).toHaveBeenCalled();
    expect(result).toEqual(fakeCoachData);
  });

  it('logs an error and returns undefined if document does not exist', async () => {
    // Setup
    const fakeId = 'nonexistent';
    const consoleSpy = jest.spyOn(console, 'log');
    const docSnapMock = {
      exists: jest.fn().mockReturnValue(false),
    };
    getDoc.mockResolvedValue(docSnapMock);

    // Execute
    const result = await getCoachById(fakeId);

    // Assert
    expect(doc).toHaveBeenCalledWith(db, 'coach', fakeId);
    expect(getDoc).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('No such document!');
    expect(result).toBeUndefined();

    // Cleanup
    consoleSpy.mockRestore();
  });
});
describe('storeLesson', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('successfully stores a lesson and shows success toast', async () => {
    // Given
    const lessonData = {
      startDate: '12/31/2023',
      endDate: '01/01/2024',
      signInDeadLine: '01/01/2024',
      duration: '1',
      tags: 'tag1, tag2',
      minAge: '18',
      minPeople: '5',
      maxPeople: '10',
    };
    const startTime = '14:00';
    const deadLineTime = '14:00';

    addDoc.mockResolvedValue({});

    // When
    await storeLesson(lessonData, startTime, deadLineTime);

    // Then
    expect(addDoc).toHaveBeenCalled();
    expect(fireToast).toHaveBeenCalledWith(
      'success',
      'New training added successfully !'
    );
  });

  it('shows error toast when storing a lesson fails', async () => {
    // Given
    const lessonData = {
      startDate: '12/31/2023',
      endDate: '01/01/2024',
      signInDeadLine: '01/01/2024',
      duration: '1',
      tags: 'tag1, tag2',
      minAge: '18',
      minPeople: '5',
      maxPeople: '10',
    };
    const startTime = '14:00';
    const deadLineTime = '14:00';
    addDoc.mockRejectedValue(new Error('Failed to add document'));

    // When
    await storeLesson(lessonData, startTime, deadLineTime);

    // Then
    expect(fireToast).toHaveBeenCalledWith('error', 'Something went wrong !');
  });
});
describe('getLessonById', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('returns lesson data if document exists', async () => {
    // Given
    const fakeId = '123';
    const fakeLessonData = {
      title: 'Test Lesson',
      description: 'This is a test',
    };
    const docSnapMock = {
      exists: jest.fn().mockReturnValue(true),
      data: jest.fn().mockReturnValue(fakeLessonData),
    };
    getDoc.mockResolvedValue(docSnapMock);

    // When
    const result = await getLessonById(fakeId);

    // Then
    expect(doc).toHaveBeenCalledWith(db, 'lesson', fakeId);
    expect(getDoc).toHaveBeenCalled();
    expect(result).toEqual(fakeLessonData);
  });

  it('logs an error and returns undefined if document does not exist', async () => {
    // Given
    const fakeId = 'nonexistent';
    const consoleSpy = jest.spyOn(console, 'log');
    const docSnapMock = {
      exists: jest.fn().mockReturnValue(false),
    };
    getDoc.mockResolvedValue(docSnapMock);

    // When
    const result = await getLessonById(fakeId);

    // Then
    expect(doc).toHaveBeenCalledWith(db, 'lesson', fakeId);
    expect(getDoc).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('No such document!');
    expect(result).toBeUndefined();

    // Cleanup
    consoleSpy.mockRestore();
  });
});

describe('getPlayerById', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('returns player data if document exists', async () => {
    // Given
    const fakeId = '123';
    const fakePlayerData = { name: 'John Doe', age: 30 };
    const docSnapMock = {
      exists: jest.fn().mockReturnValue(true),
      data: jest.fn().mockReturnValue(fakePlayerData),
    };
    getDoc.mockResolvedValue(docSnapMock);

    // When
    const result = await getPlayerById(fakeId);

    // Then
    expect(doc).toHaveBeenCalledWith(db, 'player', fakeId);
    expect(getDoc).toHaveBeenCalled();
    expect(result).toEqual(fakePlayerData);
  });

  it('logs an error and returns null if document does not exist', async () => {
    // Given
    const fakeId = 'nonexistent';
    const consoleSpy = jest.spyOn(console, 'log');
    const docSnapMock = {
      exists: jest.fn().mockReturnValue(false),
    };
    getDoc.mockResolvedValue(docSnapMock);

    // When
    const result = await getPlayerById(fakeId);

    // Then
    expect(doc).toHaveBeenCalledWith(db, 'player', fakeId);
    expect(getDoc).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('No such document!');
    expect(result).toBeNull();

    // Cleanup
    consoleSpy.mockRestore();
  });
});

describe('updateLesson', () => {
  const fakeId = 'lesson123';
  const updatedLessonData = {
    startDate: '01/02/2024',
    endDate: '01/03/2024',
    signInDeadLine: '01/02/2024',
    duration: '2',
    tags: 'updatedTag1, updatedTag2',
    minAge: '20',
    minPeople: '10',
    maxPeople: '20',
  };
  const startTime = '10:00';
  const deadLineTime = '10:00';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls updateDoc with the correct parameters and shows success toast', async () => {
    // Arrange
    updateDoc.mockResolvedValueOnce({}); // Simulate successful update

    // Act
    await updateLesson(fakeId, updatedLessonData, startTime, deadLineTime);

    // Assert
    expect(doc).toHaveBeenCalled();
    expect(updateDoc).toHaveBeenCalled();
    expect(fireToast).toHaveBeenCalledWith(
      'success',
      'Lesson updated successfully !'
    );
  });

  it('shows error toast when updating a lesson fails', async () => {
    // Arrange
    const error = new Error('Failed to update document');
    updateDoc.mockRejectedValueOnce(error); // Simulate failure

    // Act
    await updateLesson(fakeId, updatedLessonData, startTime, deadLineTime);

    // Assert
    expect(doc).toHaveBeenCalled();
    expect(updateDoc).toHaveBeenCalled();
    expect(fireToast).toHaveBeenCalledWith(
      'error',
      'Something went wrong while updating the lesson !'
    );
  });
});
describe('deleteLessonById', () => {
  const fakeId = 'lesson123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls deleteDoc with the correct parameters', async () => {
    // Arrange
    deleteDoc.mockResolvedValueOnce({}); // Simulate successful deletion

    // Act
    await deleteLessonById(fakeId);

    // Assert
    expect(doc).toHaveBeenCalled();
    expect(deleteDoc).toHaveBeenCalled();
  });

  it('logs an error message when deletion fails', async () => {
    // Arrange
    const consoleSpy = jest.spyOn(console, 'log');
    const error = new Error('Failed to delete document');
    deleteDoc.mockRejectedValueOnce(error); // Simulate failure

    // Act
    await deleteLessonById(fakeId);

    // Assert
    expect(doc).toHaveBeenCalled();
    expect(deleteDoc).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Error deleting the lesson');

    // Cleanup
    consoleSpy.mockRestore();
  });
});
