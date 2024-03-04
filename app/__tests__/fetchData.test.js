import { fetchData }  from '@/api/player-api'; 
import { db } from '@/lib/firebase'; 
import { collection, query, where, getDocs } from 'firebase/firestore'; 

// Mock the Firebase Firestore methods
jest.mock('@/lib/firebase', () => ({
  db: {
    collection: jest.fn(),
  },
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
}));

describe('fetchData function', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();
  });

  test('Fetches data without query field and value', async () => {
    const collectionName = 'testCollection';
    const mockData = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
    const mockSnapshot = { empty: false, docs: mockData.map(item => ({ data: () => item })) };

    // Mock getDocs to return data
    getDocs.mockResolvedValueOnce(mockSnapshot);

    // Call the fetchData function
    const result = await fetchData(collectionName);

    // Check if the collection method is called with the correct collection name
    expect(collection).toHaveBeenCalledWith(db, collectionName);

    // Check if getDocs is called
    expect(getDocs).toHaveBeenCalled();
    // Check if the result matches the mocked data
    expect(result).toEqual(mockSnapshot);

  });

  test('Fetches data with query field and value', async () => {
    const collectionName = 'testCollection';
    const queryField = 'fieldName';
    const queryValue = 'fieldValue';
    const mockData = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
    const mockSnapshot = { empty: false, docs: mockData.map(item => ({ data: () => item })) };

    // Mock getDocs to return data
    getDocs.mockResolvedValueOnce(mockSnapshot);

    // Call the fetchData function with query field and value
    const result = await fetchData(collectionName, queryField, queryValue);

    // Check if the collection method is called with the correct collection name
    expect(collection).toHaveBeenCalledWith(db, collectionName);

    // Check if the query method is called with the correct query field and value
    expect(query).toHaveBeenCalledWith(collection(db, collectionName), where(queryField, '==', queryValue));

    // Check if getDocs is called
    expect(getDocs).toHaveBeenCalled();

    // Check if the result matches the mocked data
    expect(result).toEqual(mockSnapshot);
  });
});
