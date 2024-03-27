import { retrieveData } from '@/api/localStorage';
import { sendMessage } from '@/api/chat-api';
import { addDoc, doc, collection } from 'firebase/firestore';
jest.mock('@/api/localStorage', () => ({ retrieveData: jest.fn() }));
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
  addDoc: jest.fn(),
  doc: jest.fn(),
  collection: jest.fn(),
}));
jest.mock('@/lib/firebase', () => ({
  db: {},
}));
describe('sendMessage function', () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it('should send message when user is authenticated', async () => {
    // Mocking data for retrieveData
    const userData = {
      user: { uid: 'user_id' },
      data: { displayName: 'John Doe', image: 'avatar.jpg' },
    };
    retrieveData.mockResolvedValueOnce(JSON.stringify(userData));

    // Mocking Firestore functions to resolve promises
    const newDoc = { id: 'mocked_document_id' };
    const addDocMock = jest.fn(() => Promise.resolve(newDoc));
    addDoc.mockImplementation(addDocMock);

    const mockedDocRef = {};
    doc.mockReturnValueOnce(mockedDocRef);

    const roomId = 'mocked_room_id';
    const message = 'Hello, world!';

    // Execute the function
    await sendMessage(roomId, message);

    // Assertions
    expect(retrieveData).toHaveBeenCalledWith('userInfo');
    expect(doc).toHaveBeenCalledWith({}, 'chat', roomId);
    expect(collection).toHaveBeenCalledWith(mockedDocRef, 'messages');
  });

  it('should return error message when user is not authenticated', async () => {
    // Mocking retrieveData to return null
    retrieveData.mockResolvedValueOnce(null);

    // Execute the function
    const result = await sendMessage('mocked_room_id', 'Hello, world!');

    // Assertions
    expect(result).toBe('User not authenticated.');
    expect(doc).not.toHaveBeenCalled();
    expect(collection).not.toHaveBeenCalled();
    expect(addDoc).not.toHaveBeenCalled();
  });

  it('should log error when an error occurs', async () => {
    // Mocking an error from retrieveData
    const errorMessage = 'Some error occurred';
    retrieveData.mockRejectedValueOnce(new Error(errorMessage));

    // Execute the function
    await sendMessage('mocked_room_id', 'Hello, world!');

    // Assertions

    expect(doc).not.toHaveBeenCalled();
    expect(collection).not.toHaveBeenCalled();
    expect(addDoc).not.toHaveBeenCalled();
  });
});
