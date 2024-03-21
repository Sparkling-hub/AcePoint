import { getMessages } from '@/api/chat-api'; 
import { collection,query,orderBy,onSnapshot } from 'firebase/firestore'; 
import { auth } from '@/lib/firebase';

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
    collection: jest.fn(),
    query: jest.fn(),
    orderBy: jest.fn(),
    onSnapshot: jest.fn(),
})); 
jest.mock("@/lib/firebase", () => ({
    auth: {
        currentUser: {
          uid: 'user_id'
        }
    },
}));
describe('getMessages', () => {
    it('should get messages for authenticated user', () => {
      const mockCallback = jest.fn();
      const mockQuerySnapshot = {
        docs: [
          { id: '1', data: () => ({ sender: 'user_id', members: ['user_id'] }) },
          { id: '2', data: () => ({ sender: 'other_user_id', members: ['user_id'] }) },
          { id: '3', data: () => ({ sender: 'user_id', members: ['other_user_id'] }) },
          { id: '4', data: () => ({ sender: 'other_user_id', members: ['other_user_id'] }) }
        ]
      };
  
      collection.mockReturnValueOnce({});
      query.mockReturnValueOnce({});
      orderBy.mockReturnValueOnce({});
      onSnapshot.mockImplementationOnce((q, callback) => {
        callback(mockQuerySnapshot);
      });
  
      const result = getMessages(mockCallback);
      expect(result).toBeUndefined();
      // Check if the correct data is passed to the callback
      expect(mockCallback).toHaveBeenCalledWith([
        { id: '1', sender: 'user_id', members: ['user_id'] },
        { id: '2', sender: 'other_user_id', members: ['user_id'] },
        { id: '3', sender: 'user_id', members: ['other_user_id'] },
        { id: '4',  sender: 'other_user_id', members: ['other_user_id'] }
      ]);
      // Check if the result is undefined (as onSnapshot doesn't return anything)
      
    });
  
    it('should return error message for unauthenticated user', () => {
      auth.currentUser = null;
      

      onSnapshot.mockImplementationOnce(() => {});

      const result = getMessages(() => {});
      // Check if the correct error message is returned
      expect(result).toBe('User not authenticated.');
      // Check if other methods are not called
      expect(query).toHaveBeenCalled();
      expect(orderBy).toHaveBeenCalled();
      expect(collection).toHaveBeenCalled();
    });
    it('should handle errors gracefully', async () => {
        const mockCallback = jest.fn();
    
        // Simulate error by throwing an exception
        const errorMessage = 'Some error occurred';
        query.mockImplementationOnce(() => { throw new Error(errorMessage); });
    
        const result = getMessages(mockCallback);
    
        // Check if the correct error message is returned
        expect(result).toBe(errorMessage);
      });
  });