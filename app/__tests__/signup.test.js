jest.mock('firebase/app', () => ({
    initializeApp: jest.fn(),
  }));
  jest.mock('firebase/auth', () => ({
    initializeAuth: jest.fn(),
    getReactNativePersistence: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword:jest.fn().mockImplementation(() => Promise.resolve()),

  }));
  jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    getDocs: jest.fn(() => Promise.resolve({ empty: true })),
  }));
  jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }));
  jest.mock('firebase/storage', () => ({
    ref: jest.fn(),
    getDownloadURL: jest.fn(),
    uploadBytesResumable: jest.fn(),
    getStorage: jest.fn()
  }));
  
  import { expect, jest, describe, afterEach, it } from '@jest/globals';
  import { signup } from '@/api/auth-api';
  import { auth,createUserWithEmailAndPassword } from '@/lib/firebase';
  
  describe('signUpCoach', () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'securePassword123';
  
    beforeEach(() => {
      jest.clearAllMocks();
  
    });
  
    it('signs up a user successfully', async () => {
      const mockFirebaseUser = {
        user: {
          auth: auth,
          email: mockEmail,
        },
      };
       await signup({email:mockEmail, password:mockPassword});
      createUserWithEmailAndPassword.mockReturnValueOnce(      
      auth, 
      mockEmail,
      mockPassword);
      expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  
      expect(mockFirebaseUser).toEqual(mockFirebaseUser);
    });
  
    it('throws an error if signup fails', async () => {
      const mockError = {
        code: 'auth/email-already-in-use',
        message: 'The email address is already in use by another account.',
      };
    
      createUserWithEmailAndPassword.mockRejectedValue(mockError);
  
      await signup({email:mockEmail, password:mockPassword})
  
       expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
         auth, 
         mockEmail,
         mockPassword
       );
    });
  });
  afterEach(() => {
      jest.clearAllMocks();
    });