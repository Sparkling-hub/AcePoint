import { render, waitFor } from 'react-native-testing-library';
import * as redux from 'react-redux';
import * as AsyncStorage from '@react-native-async-storage/async-storage';
import AccountScreen from '@/screens/AccountScreen';
import SettingsScreen from '@/screens/SettingScreen';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

jest.mock('tamagui', () => ({
  YStack: jest.fn(),
  Text: jest.fn(),
  XStack: jest.fn()
}));
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(() => Promise.resolve({ empty: true })),
  where: jest.fn(),
  query: jest.fn(),
}));
// Mocking modules and hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));
jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));
jest.mock('@/components/auth/Logout', () => ({
  handleLogout: jest.fn(),
}));
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  initializeAuth: jest.fn(),
  getReactNativePersistence: jest.fn(),
  createUserWithEmailAndPassword: jest.fn().mockImplementation(() => Promise.resolve()),
  signOut: jest.fn(),
  signInWithEmailAndPassword: jest.fn()
}));
jest.mock('firebase/storage', () => ({
  ref: jest.fn(),
  getDownloadURL: jest.fn(),
  uploadBytesResumable: jest.fn(),
  getStorage: jest.fn(),
}));

describe('AccountScreen', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    (redux.useSelector).mockImplementation(callback =>
      callback({
        userRole: { userRole: 'Player' },
      })
    );
    (AsyncStorage.getItem).mockResolvedValue('Test User');
  });
  it('updates username state after fetching from AsyncStorage', async () => {
    AsyncStorage.getItem.mockResolvedValue('Test Name');
    const { findByText } = render(<AccountScreen />);
    await waitFor(() => {
      expect(findByText('Test Name')).toBeTruthy();
    });
  });

});