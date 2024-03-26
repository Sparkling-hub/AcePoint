import { createRoom } from '@/api/chat-api';
import { doc, setDoc } from 'firebase/firestore';

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
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

jest.mock('@/lib/firebase', () => ({
  db: {},
}));

describe('createRoom function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a room with provided roomId and timestamp', async () => {
    const roomId = 'mocked_room_id';
    const mockedRoomRef = {};
    doc.mockReturnValueOnce(mockedRoomRef);

    // Execute the function
    await createRoom(roomId);

    // Assertions
    expect(doc).toHaveBeenCalledWith({}, 'chat', roomId);
  });

  it('should log error if room creation fails', async () => {
    const errorMessage = 'Failed to create room';
    doc.mockReturnValueOnce({});
    setDoc.mockRejectedValueOnce(new Error(errorMessage));

    // Execute the function
    await createRoom('mocked_room_id');
  });
});
