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
  setItem: jest.fn(),
  getItem: jest.fn()
}));
jest.mock('expo-router', () => ({
  router: {
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
jest.mock('react-native-toast-message', () => ({
  default: {
    show: jest.fn()
  }
}));
import { expect, jest, describe, afterEach, it } from '@jest/globals';
import { findUserByEmail, findConnectedUserByEmail } from '@/services/user';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

describe('findUserByEmail', () => {
  const email = 'test@example.com';
  const displayName = 'Test User';
  const photoURL = 'http://example.com/photo.jpg';
  const mockPlayerData = {
    email,
    displayName,
    picture: photoURL,
    gender: 'not specified',
    phoneNumber: '1234567890',
    birthday: '01/01/2000',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a new player if no existing player is found with provided email', async () => {
    getDocs.mockResolvedValue({ empty: true });
    addDoc.mockResolvedValue({ id: '123' });

    await findUserByEmail(email, displayName, photoURL);

    expect(getDocs).toHaveBeenCalledWith(
      query(collection(db, 'player'), where('email', '==', email))
    );
  });

  it('should push to edit-profile route if existing player data is incomplete', async () => {
    const querySnapshot = {
      empty: false,
      forEach: jest.fn((callback) => {
        callback({ data: () => ({ email, displayName }) });
      }),
    };
    getDocs.mockResolvedValue(querySnapshot);

    await findUserByEmail(email, displayName, photoURL);
    expect(ReactNativeAsyncStorage.setItem).toBeCalled()
    expect(querySnapshot.forEach).toHaveBeenCalled();
  });

  it('should alert the player without additional actions if existing player data is complete', async () => {
    const querySnapshot = {
      empty: false,
      forEach: jest.fn((callback) => {
        callback({ data: () => mockPlayerData });
      }),
    };
    getDocs.mockResolvedValue(querySnapshot);

    await findUserByEmail(email, displayName, photoURL);
    expect(ReactNativeAsyncStorage.setItem).toBeCalled()
    expect(querySnapshot.forEach).toHaveBeenCalled();

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
