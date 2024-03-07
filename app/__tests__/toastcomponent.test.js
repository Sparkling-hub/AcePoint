import fireToast from '@/components/toast/Toast'
import Toast from 'react-native-toast-message'; // Import the Toast module

// Mock the Toast module
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

describe('fireToast function', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  it('should show a success toast with the provided message', () => {
    const message = 'Success message';
    const type = 'success';

    fireToast({ message, type });

    expect(Toast.show).toHaveBeenCalledWith({
      type,
      text1: message,
      text1Style: { color: 'green' }, // Assuming success messages have green color
    });
  });

  it('should show an error toast with the provided message', () => {
    const message = 'Error message';
    const type = 'error';

    fireToast({ message, type });

    expect(Toast.show).toHaveBeenCalledWith({
      type,
      text1: message,
      text1Style: { color: 'red' }, // Assuming error messages have red color
    });
  });
});
