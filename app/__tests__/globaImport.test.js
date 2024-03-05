// setupTests.ts
import { jest } from "@jest/globals";

jest.mock('firebase/auth', () => ({
  getReactNativePersistence: jest.fn(),
  initializeAuth: jest.fn(),
}));

jest.mock("@/lib/firebase", () => ({
  db: {}
}));

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  ReactNativeAsyncStorage: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
  orderBy: jest.fn(),
  startAt: jest.fn(),
  endAt: jest.fn(),
}));
describe('Example ', () => {
  test('Example Test Case', () => {
    // Test logic goes here
    expect(true).toBe(true); // Example assertion
  });
});
export {
  jest
};
