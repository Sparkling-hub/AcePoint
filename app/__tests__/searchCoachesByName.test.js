import { jest } from './globaImport.test'
import { findCoachByName } from '@/api/player-api';
import { db } from '@/lib/firebase';
import { getDocs, query, collection, where } from 'firebase/firestore';

describe('findCoachByName', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test('should return coaches when a name is provided', async () => {
      const name = 'Ggfff';
      const mockCoaches = [{ id: '1', data: () => ({ displayName: 'Ggfff' }) }];
      const mockQuery = jest.fn();
      query.mockReturnValue(mockQuery);
      getDocs.mockResolvedValueOnce({ empty: false, forEach: jest.fn((callback) => mockCoaches.forEach(callback)) });
  
      const result = await findCoachByName({ name });
  
      result.forEach((coach) => {
        expect(coach.data()).toEqual(mockCoaches[0].data());
      });
    });
  
    test('should return all coaches when the name is empty', async () => {
        const mockCoaches = [
            { 
              id: '1', 
              data: () => ({ 
                displayName: 'Ggfff', 
                phoneNumber: '+932525', 
                marketing: false, 
                terms: false, 
                bios: 'Bios',
                createdAt: { nanoseconds: 144000000, seconds: 1708409070 },
                image: 'https://firebasestorage.googleapis.com/v0/b/acepoint-9cd79.appspot.com/o/profileImage%2F1708409083702?alt=media&token=10b50d9b-ac30-4d6f-8864-b48c4ee0dd4d',
                tags: 'Tags'
              }) 
            }
          ];      const mockCollection = jest.fn();
      collection.mockReturnValue(mockCollection);
      getDocs.mockResolvedValueOnce({ empty: false, forEach: jest.fn((callback) => mockCoaches.forEach(callback)) });
  
      const result = await findCoachByName({ name: '' });
  
      result.forEach((coach) => {
        expect(coach.data()).toEqual(mockCoaches[0].data());
      });
    });
  
    test('should return "coach dose not exist" if no coaches found', async () => {
      const name = 'NonExistingCoach';
      const mockQuery = jest.fn();
      query.mockReturnValue(mockQuery);
      getDocs.mockResolvedValueOnce({ empty: true });
  
      const result = await findCoachByName({ name });
      expect(result).toBe('coach does not exist');
      expect(query).toHaveBeenCalledWith(collection(db, 'coach'), where('displayName', '==', name));
    });
  
    test('should return error message if an error occurs', async () => {
      const name = 'Ggfff';
      const errorMessage = 'An error occurred';
      const mockQuery = jest.fn();
      query.mockReturnValue(mockQuery);
      getDocs.mockRejectedValueOnce(new Error(errorMessage));
  
      const result = await findCoachByName({ name });
  
      expect(result).toBe(errorMessage);
      expect(query).toHaveBeenCalledWith(collection(db, 'coach'), where('displayName', '==', name));
    });
  });