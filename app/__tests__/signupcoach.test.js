import { render, fireEvent } from '@testing-library/react-native';
import SignUpCoach from '@/screens/SignUpCoach';
import { signUpCoach } from '@/api/auth-api';
import { jest } from './globaImport'

jest.mock('@/api/auth-api', () => ({
  signUpCoach: jest.fn(),
}));

describe('SignUpCoach component', () => {
  it('should call signUpCoach and navigate to Information component on successful sign up', () => {
    const { getByTestId } = render(<SignUpCoach />);
    const signUpButton = getByTestId('sign-up-button');

    fireEvent(signUpButton, 'press');

    expect(signUpCoach).toHaveBeenCalled();
    // You need to mock the successful sign-up scenario to test navigation to the next component
    // You can use a state variable or navigation library to navigate to the next component
    // Then, you can assert that the next component is rendered
  });
});
