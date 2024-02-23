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
    addDoc: jest.fn(),
    getDocs: jest.fn(() => Promise.resolve({ empty: true })),
    where: jest.fn(),
    query: jest.fn(),
    setDoc: jest.fn(),
    doc: jest.fn(),
  }));
  jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }));
  jest.mock('expo-router', () => ({
    router: {
      push: jest.fn(),
    },
  }));
  jest.mock('react-native', () => ({
    Alert: {
      alert: jest.fn(),
    },
  }));
  jest.mock('firebase/storage', () => ({
    ref: jest.fn(),
    getDownloadURL: jest.fn(),
    uploadBytesResumable: jest.fn(),
    getStorage: jest.fn()
  }));
  
  import { expect, jest, describe, afterEach, it } from '@jest/globals';
  import { signup } from '@/api/auth-api';
  import { router } from 'expo-router';
  import { Alert } from 'react-native';
  import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
  import { auth,createUserWithEmailAndPassword } from '@/lib/firebase';
  
  describe('signUpCoach', () => {
    const mockEmail = 'test@example.com';
    const mockPassword = 'securePassword123';
    const coach ={  
      displayName: "coachdisplayName",
      phoneNumber:"coachphoneNumber",
      terms:true,
      marketing:true,
      createdAt:new Date()
    }; 
  
    beforeEach(() => {
      jest.clearAllMocks();
  
      //createUserWithEmailAndPassword.mockReset();
    });
  
    it('signs up a user successfully', async () => {
      // This is an example of a user object your Firebase function might resolve with
      const mockFirebaseUser = {
        user: {
          auth: auth,
          email: mockEmail,
        },
      };
      // Mock the FirebaseAuth function to resolve with the user object
      // Call your signUp function
      const user = await signup({email:mockEmail, password:mockPassword});
      createUserWithEmailAndPassword.mockReturnValueOnce(      
      auth, // This will be the mocked Firebase Auth object
      mockEmail,
      mockPassword);
      // Test if Firebase function was called with correct parameters
      expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  
      // Test if your signUp function resolves with the correct user object
      expect(mockFirebaseUser).toEqual(mockFirebaseUser);
    });
  
    it('throws an error if signup fails', async () => {
      // This is an example of an error that Firebase might throw
      const mockError = {
        code: 'auth/email-already-in-use',
        message: 'The email address is already in use by another account.',
      };
    
      // Mock the FirebaseAuth function to reject with the error
      createUserWithEmailAndPassword.mockRejectedValue(mockError);
  
      //  Expect the signUp function to throw an error
      await signup({email:mockEmail, password:mockPassword})
  
      // Test if Firebase function was called with correct parameters
       expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
         auth, // This is the mocked Firebase Auth object
         mockEmail,
         mockPassword
       );
    });
  });
  afterEach(() => {
      jest.clearAllMocks();
    });