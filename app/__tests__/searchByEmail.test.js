import { getDocs,query,collection,where } from 'firebase/firestore';
import { findByName} from '@/api/player-api'
import {db } from '@/lib/firebase'

jest.mock('firebase/auth', () => ({
  getReactNativePersistence: jest.fn(),
  initializeAuth: jest.fn(),
}));
jest.mock("@/lib/firebase", () => ({
  db: {}
}));
jest.mock('firebase/app', () => ({initializeApp: jest.fn(),}));
jest.mock('firebase/storage', () => ({getStorage: jest.fn(),}));
jest.mock('@react-native-async-storage/async-storage', () => ({ReactNativeAsyncStorage: jest.fn()}));

jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(),
}));


describe('findByName', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return clubs when a name is provided', async () => {
    const name = 'ClubA';
    const mockClubs = [{ id: '1', data: () => ({ name: 'ClubA' }) }];
    const mockQuery = jest.fn();
    query.mockReturnValue(mockQuery);
    getDocs.mockResolvedValueOnce({ empty: false, forEach: jest.fn((callback) => mockClubs.forEach(callback)) });

    const result = await findByName({ name });
    result.forEach((club)=>{
      expect(club.data()).toEqual(mockClubs[0].data());
    })
    
    
  });

  test('should return all clubs when the name is empty', async () => {
    const mockClubs = [{ id: '1', data: () => ({ name: 'ClubA' }) }];
    const mockCollection = jest.fn();
    collection.mockReturnValue(mockCollection);
    getDocs.mockResolvedValueOnce({ empty: false, forEach: jest.fn((callback) => mockClubs.forEach(callback)) });

    const result = await findByName({ name: '' });

    result.forEach((club)=>{
      expect(club.data()).toEqual(mockClubs[0].data());
    })
  });

  test('should return "name does not exist" if no clubs found', async () => {
    const name = 'NonExistingClub';
    const mockQuery = jest.fn();
    query.mockReturnValue(mockQuery);
    getDocs.mockResolvedValueOnce({ empty: true });

    const result = await findByName({ name });
    expect(result).toBe('Name does not exist');
    expect(query).toHaveBeenCalledWith(collection(db, 'club'), where('name', '==', name));
  });

  test('should return error message if an error occurs', async () => {
    const name = 'ClubA';
    const errorMessage = 'An error occurred';
    const mockQuery = jest.fn();
    query.mockReturnValue(mockQuery);
    getDocs.mockRejectedValueOnce(new Error(errorMessage));

    const result = await findByName({ name });

    expect(result).toBe(errorMessage);
    expect(query).toHaveBeenCalledWith(collection(db, 'club'), where('name', '==', name));
  });
});