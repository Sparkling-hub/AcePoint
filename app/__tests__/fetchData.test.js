import { fetchData }  from '@/api/player-api'; 

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
  orderBy: jest.fn(),
  startAt: jest.fn(),
  endAt: jest.fn(),
}));

describe('fetchData function', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();
  });

  it('fetches all documents from a collection when no query is provided', async () => {
    const collectionName = 'testCollection';
    const mockDocs = [{ id: '1', data: jest.fn(() => ({ foo: 'bar' })) }];
    const mockSnapshot = { docs: mockDocs };

    // Mock the behavior of getDocs to return mockSnapshot
    const { getDocs, collection } = require('firebase/firestore');
    collection.mockReturnValueOnce({});
    getDocs.mockResolvedValueOnce(mockSnapshot);

    const result = await fetchData(collectionName);
    result.docs.map((club)=>{
    expect(club.data()).toEqual({ foo: 'bar' });
  })
    expect(collection).toHaveBeenCalledWith(expect.anything(), collectionName);
    expect(getDocs).toHaveBeenCalledWith({});
  });

  it('fetches documents based on query when queryField and queryValue are provided', async () => {
    const collectionName = 'testCollection';
    const queryField = 'name';
    const queryValue = 'John';
    const mockDocs = [{ id: '1', data: jest.fn(() => ({ name: 'John Doe' })) }];
    const mockSnapshot = { docs: mockDocs };

    // Mock the behavior of getDocs to return mockSnapshot
    const { getDocs, collection, query, orderBy, startAt, endAt } = require('firebase/firestore');
    collection.mockReturnValueOnce({});
    query.mockReturnValueOnce({});
    orderBy.mockReturnValueOnce({});
    startAt.mockReturnValueOnce({});
    endAt.mockReturnValueOnce({});
    getDocs.mockResolvedValueOnce(mockSnapshot);

    const result = await fetchData(collectionName, queryField, queryValue);
    result.docs.map((club)=>{
    expect(club.data()).toEqual({ name: 'John Doe' });
  })
    expect(collection).toHaveBeenCalledWith(expect.anything(), collectionName);
    expect(orderBy).toHaveBeenCalledWith(queryField);
    expect(startAt).toHaveBeenCalledWith(queryValue);
    expect(endAt).toHaveBeenCalledWith(queryValue + "\uf8ff");
    expect(getDocs).toHaveBeenCalledWith({});
  });
});
