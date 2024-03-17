import { favoriteCoachList, getPlayerById } from '@/api/player-api'
import { getCoachById } from '@/api/coach-api'
import { storeLesson, getLessonById } from '@/api/lesson-api';
import { auth, db } from '@/lib/firebase';
import { getDoc, getDocs, doc, addDoc } from 'firebase/firestore';
import fireToast from "@/services/toast";

jest.mock("@/services/toast", () => {
    return {
        __esModule: true,
        default: jest.fn()
    };
});
jest.mock('firebase/auth', () => ({
  getReactNativePersistence: jest.fn(),
  initializeAuth: jest.fn(),
}));

jest.mock('firebase/app', () => ({ initializeApp: jest.fn(), }));
jest.mock('firebase/storage', () => ({ getStorage: jest.fn(), }));
jest.mock('@react-native-async-storage/async-storage', () => ({ ReactNativeAsyncStorage: jest.fn() }));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn()
}));
jest.mock("@/lib/firebase", () => ({
  auth: jest.fn(),
}));
describe('favoriteCoachList function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should return "User not authenticated." when currentUser is not defined', async () => {
    auth.currentUser = null;
    const result = await favoriteCoachList();
    expect(result).toBe("User not authenticated.");
  });

  test('should return "Player does not exist." when player does not exist', async () => {
    const mockCurrentUser = { uid: 'user123' };
    auth.currentUser = mockCurrentUser;
    getDoc.mockResolvedValueOnce({ exists: () => false, data: () => null });
    const result = await favoriteCoachList();
    expect(result).toBe("Player does not exist.");
  });

  test('should handle error if fetching coach data fails', async () => {
    const playerData = {
      favoriteCoach: ['coachId1']
    };
    getDoc.mockResolvedValueOnce({ exists: () => true, data: () => playerData });

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
    (getDoc).mockResolvedValue(docSnapMock);

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
    (getDoc).mockResolvedValue(docSnapMock);

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
      startDate: "12/31/2023",
      endDate: "01/01/2024",
      duration: "1",
      tags: "tag1, tag2",
      minAge: "18",
      minPeople: "5",
      maxPeople: "10",
    };
    const startTime = "14:00";
    (addDoc).mockResolvedValue({});

    // When
    await storeLesson(lessonData, startTime);

    // Then
    expect(addDoc).toHaveBeenCalled();
    expect(fireToast).toHaveBeenCalledWith('success', 'New training added successfully !');
  });

  it('shows error toast when storing a lesson fails', async () => {
    // Given
    const lessonData = {
      startDate: "12/31/2023",
      endDate: "01/01/2024",
      duration: "1",
      tags: "tag1, tag2",
      minAge: "18",
      minPeople: "5",
      maxPeople: "10",
    }
    const startTime = "14:00";
    (addDoc).mockRejectedValue(new Error('Failed to add document'));

    // When
    await storeLesson(lessonData, startTime);

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
    const fakeLessonData = { title: 'Test Lesson', description: 'This is a test' };
    const docSnapMock = {
      exists: jest.fn().mockReturnValue(true),
      data: jest.fn().mockReturnValue(fakeLessonData),
    };
    (getDoc).mockResolvedValue(docSnapMock);

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
    (getDoc).mockResolvedValue(docSnapMock);

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
    (getDoc).mockResolvedValue(docSnapMock);

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
    (getDoc).mockResolvedValue(docSnapMock);

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