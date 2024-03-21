import { retrieveData } from "@/api/localStorage";
import { sendMessage } from '@/api/chat-api'; 
import { addDoc } from 'firebase/firestore'; 
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
})); 
jest.mock("@/lib/firebase", () => ({
    db: {}
}));
describe('sendMessage', () => {
    beforeEach(() => {
      // Clear mocks before each test
      jest.clearAllMocks();
    });
  
    it('should send message if user is authenticated', async () => {
      // Mock data for retrieveData
      const userData = { user: { uid: 'user_id' } };
      retrieveData.mockResolvedValueOnce(JSON.stringify(userData));
      
      const chat = {
        emoji: '😊',
        message: 'Hello!',
        members: ['user1', 'user2']
      };
  
      await sendMessage(chat);
      expect(retrieveData).toHaveBeenCalledWith('userInfo');

      // Check if addDoc is called with correct parameters
      expect(addDoc).toEqual(
        expect.anything(), // Collection reference
        {
          emoji: chat.emoji,
          message: chat.message,
          sendAt: expect.anything(), // Timestamp object
          seen: false,
          sender: 'user_id', // From userData mock
          members: chat.members,
        }
      );
    });
  
    it('should return error if user is not authenticated', async () => {
      // Mocking retrieveData to return null
      retrieveData.mockResolvedValueOnce(null);
  
      const chat = {
        emoji: '😊',
        message: 'Hello!',
        members: ['user1', 'user2']
      };
  
      const result = await sendMessage(chat);
  
      // Check if addDoc is not called
      expect(addDoc).not.toHaveBeenCalled();
      expect(retrieveData).toHaveBeenCalledWith('userInfo');

      // Check if result is 'User not authenticated.'
      expect(result).toBe('User not authenticated.');
    });
  
    it('should handle errors gracefully', async () => {
      // Mocking an error from retrieveData
      const errorMessage = 'Some error occurred';
      retrieveData.mockRejectedValueOnce(new Error(errorMessage));
  
      const chat = {
        emoji: '😊',
        message: 'Hello!',
        members: ['user1', 'user2']
      };
  
      const result =await sendMessage(chat);
      // Check if addDoc is not called
      expect(addDoc).not.toHaveBeenCalled();
  
      // Check if console.error is called with the correct error message
      expect(result).toBe(errorMessage);
    });
  });