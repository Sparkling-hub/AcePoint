import { expect, jest, describe, afterEach, it } from '@jest/globals';


jest.mock('firebase/firestore', () => ({
  deleteDoc: jest.fn(),
  doc: jest.fn()
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
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

jest.mock('@/lib/firebase', () => ({
  auth: {
    currentUser: {
      delete: jest.fn().mockResolvedValueOnce() // Mock delete method with Jest mock function
    }
  },
}))
jest.mock("react-native-toast-message", () => ({
  __esModule: true,
  default: {
    show: jest.fn()
  }
}));
jest.mock('@/components/auth/Logout', () => ({
  handleLogout: jest.fn()
}))
import { db, auth } from '@/lib/firebase';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { deleteDoc, doc } from 'firebase/firestore';
import { handleDeleteAccount } from '@/services/user'
import { handleLogout } from '@/components/auth/Logout';

describe('handleDeleteAccount function', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should delete user account and logout when user is logged in', async () => {

    // Call the function
    await handleDeleteAccount('Coach');

    // Assertions
    expect(auth.currentUser.delete).toHaveBeenCalled();
    expect(handleLogout).toHaveBeenCalled();
  });

  it('should delete user document and redirect when user is not logged in', async () => {
    // Mock user not being logged in
    auth.currentUser = null;

    // Mock AsyncStorage getItem result
    ReactNativeAsyncStorage.getItem.mockResolvedValueOnce('userID');

    // Mock document deletion
    deleteDoc.mockResolvedValueOnce();

    // Call the function
    await handleDeleteAccount('Player');

    // Assertions
    expect(ReactNativeAsyncStorage.getItem).toHaveBeenCalledWith('userID');
    expect(doc).toHaveBeenCalledWith(db, 'coach', 'userID');
    expect(deleteDoc).toHaveBeenCalledTimes(1);
    expect(handleLogout).toHaveBeenCalled();

  });
});