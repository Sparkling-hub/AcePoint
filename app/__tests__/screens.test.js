import { render, waitFor, fireEvent } from 'react-native-testing-library';
import * as redux from 'react-redux';
import * as AsyncStorage from '@react-native-async-storage/async-storage';
import AccountScreen from '@/screens/AccountScreen';
import Notification from '../notification';
import Account from '../user/account';
import Security from '../user/security';
import Legal from '../legal'
import Support from '../support'
import AddButtonCalendar from '@/components/AddButtonCalendar'
import CalendarIconLabel from '@/components/tabIcons/CalendarIconLabel'
import CalendarIcon from '@/components/tabIcons/CalendarIcon'
import Colors from '@/constants/Colors';
import CustomDropdownMultiSelect from '@/components/Form/dropdown/CustomDropdownMultiSelectProps';
import React from 'react';

jest.mock('tamagui', () => ({
  YStack: jest.fn(),
  Text: jest.fn(),
  XStack: jest.fn(),
  Switch: jest.fn(),
  Button: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(() => Promise.resolve({ docs: [] })),
  where: jest.fn(),
  query: jest.fn(),
  doc: jest.fn(),
  updateDoc: jest.fn(),
  getDoc: jest.fn(() => Promise.resolve({ data: jest.fn() })),
}));
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));
jest.mock('expo-router', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
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
jest.mock('expo-router', () => ({
  useRouter: jest.fn()
}))
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
  it('Notifications renders correctly', () => {
    const testID = 'notification-screen';
    const { getByTestId } = render(<Notification testID={testID} />);
    expect(getByTestId(testID)).toBeTruthy();
  });
  it('Account renders correctly', () => {
    const testID = 'account-screen';
    const { getByTestId } = render(<Account testID={testID} />);
    expect(getByTestId(testID)).toBeTruthy();
  });
  it('Security renders correctly', () => {
    const testID = 'security-screen';
    const { getByTestId } = render(<Security testID={testID} />);
    expect(getByTestId(testID)).toBeTruthy();
  });
  it('Support renders correctly', () => {
    const testID = 'support-screen';
    const { getByTestId } = render(<Support testID={testID} />);
    expect(getByTestId(testID)).toBeTruthy();
  });
  it('Legal renders correctly', () => {
    const testID = 'legal-screen';
    const { getByTestId } = render(<Legal testID={testID} />);
    expect(getByTestId(testID)).toBeTruthy();
  });
  it('Add button calendar renders correctly', () => {
    const testID = 'add-button-calendar';
    const { getByTestId } = render(<AddButtonCalendar testID={testID} />);
    expect(getByTestId(testID)).toBeTruthy();
  });
  it('Calendar icon label renders correctly', () => {
    const testID = 'calendar-icon-label-calendar';
    const { getByTestId } = render(<CalendarIconLabel testID={testID} focused={true} />);
    expect(getByTestId(testID)).toBeTruthy();
  });
  it('Calendar icon renders correctly when focused', () => {
    const testID = 'calendar-icon-calendar';
    const { getByTestId } = render(<CalendarIcon testID={testID} focused={true} />);
    const calendarIcon = getByTestId(testID);
    expect(calendarIcon).toBeTruthy();
    expect(calendarIcon.props.fill).toEqual(Colors.secondary);
  });

  it('Calendar icon renders correctly when not focused', () => {
    const testID = 'calendar-icon-calendar';
    const { getByTestId } = render(<CalendarIcon testID={testID} focused={false} />);
    const calendarIcon = getByTestId(testID);
    expect(calendarIcon).toBeTruthy();
    expect(calendarIcon.props.fill).toEqual(Colors.primary);
  });


});

describe('CustomDropdownMultiSelect', () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ];
  const selectedItems = [];
  const handleChange = jest.fn();

  it('CustomDropdownMultiSelect renders correctly', () => {
    const testID = 'CustomDropdownMultiSelect';
    const { getByTestId } = render(<CustomDropdownMultiSelect
      testID={testID}
      placeholder="Select Options"
      options={options}
      selectedItems={selectedItems}
      handleChange={handleChange}
    />);
    const dropdown = getByTestId(testID);
    expect(dropdown).toBeTruthy();
  });
});