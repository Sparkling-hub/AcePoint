import { fetchData } from '@/api/player-api';
import { getDocs } from 'firebase/firestore';
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

describe('fetchData', () => {
  // Test case for 'coach' collection with queryField and queryValue
  it('fetches coach data with query', async () => {
    const mockDoc = {
      data: () => ({ displayName: 'SomeName' }),
      id: 'someId',
    };
    const mockSnapshot = { forEach: jest.fn((cb) => cb(mockDoc)) };
    getDocs.mockResolvedValue(mockSnapshot);

    const result = await fetchData('coach', 'displayName', 'SomeName');
    expect(result).toEqual([{ displayName: 'SomeName', id: 'someId' }]);
  });

  // Test case for 'club' collection with queryField and queryValue
  it('fetches club data with query', async () => {
    const mockDoc = {
      data: () => ({ name: 'SomeClub' }),
      id: 'someId',
    };
    const mockSnapshot = { forEach: jest.fn((cb) => cb(mockDoc)) };
    getDocs.mockResolvedValue(mockSnapshot);

    const result = await fetchData('club', 'name', 'SomeClub');
    expect(result).toEqual([{ name: 'SomeClub', id: 'someId' }]);
  });

  // Test case for 'coach' collection without query
  it('fetches coach data without query', async () => {
    const mockDoc = {
      data: () => ({ displayName: 'SomeName' }),
      id: 'someId',
    };
    const mockSnapshot = { forEach: jest.fn((cb) => cb(mockDoc)) };
    getDocs.mockResolvedValue(mockSnapshot);

    const result = await fetchData('coach', 'displayName', 'SomeName');
    expect(result).toEqual([{ displayName: 'SomeName', id: 'someId' }]);
  });

  // Test case for 'club' collection without query
  it('fetches club data without query', async () => {
    const mockDoc = {
      data: () => ({ name: 'SomeClub' }),
      id: 'someId',
    };
    const mockSnapshot = { forEach: jest.fn((cb) => cb(mockDoc)) };
    getDocs.mockResolvedValue(mockSnapshot);

    const result = await fetchData('club', 'name', 'SomeClub');
    expect(result).toEqual([{ name: 'SomeClub', id: 'someId' }]);
  });

  // Test case when collectionName is neither 'coach' nor 'club'
  it('returns empty array for unknown collection', async () => {
    const result = await fetchData('unknownCollection');
    expect(result).toEqual([]);
  });
});
