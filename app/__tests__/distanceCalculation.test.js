import { distanceCalculation,calculateDistance } from '@/api/player-api'
import {getDocs,collection,db} from 'firebase/firestore'
jest.mock('firebase/firestore', () => ({
    getDocs: jest.fn(),
    collection: jest.fn(),
    db: jest.fn(),
    getFirestore: jest.fn(),
}));  
jest.mock('firebase/auth', () => ({
    getReactNativePersistence: jest.fn(),
    initializeAuth: jest.fn(),
}));
jest.mock('firebase/app', () => ({initializeApp: jest.fn(),}));
jest.mock('firebase/storage', () => ({getStorage: jest.fn(),}));
jest.mock('@react-native-async-storage/async-storage', () => ({ReactNativeAsyncStorage: jest.fn()}));
describe('distanceCalculation', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return "there is no club" if clubs collection is empty', async () => {
        getDocs.mockResolvedValueOnce({ empty: true });
        const result = await distanceCalculation(40.7128, -74.0060, 1000);
        expect(result).toBe('there is no club');
        expect(getDocs).toHaveBeenCalledWith(collection(db, "club"));
    });
  
    // it('should calculate distances for clubs within the given radius', async () => {
    //   const mockClubData = [
    //     { data: () => ({ latitude: 40.7128, longitude: -74.0060 }) },
    //     { data: () => ({ latitude: 40.73061, longitude: -73.935242 }) }
    //   ];
    //   getDocs.mockResolvedValueOnce({ empty: false, docs: mockClubData });
  
    //     const result= await distanceCalculation(40.7128, -74.0060, 1000);
    //     console.log('result: ',result)
    // // Assert that calculateDistance is called for each club data
    // //   expect(calculateDistance).toHaveBeenCalledTimes(2);
    // //   expect(calculateDistance).toHaveBeenCalledWith(40.7128, -74.0060, mockClubData[0].data(), 1000);
    // //   expect(calculateDistance).toHaveBeenCalledWith(40.7128, -74.0060, mockClubData[1].data(), 1000);
    // });
  
    it('should handle errors gracefully', async () => {
      const mockError = 'Firestore error';
      getDocs.mockRejectedValue(new Error(mockError));;
      const result= await distanceCalculation(40.7128, -74.0060, 1000);
      expect(result).toStrictEqual(new Error(mockError));
      expect(getDocs).toHaveBeenCalledWith(collection(db, "club"));
     });
  });