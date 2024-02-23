import { updateUser } from '@/api/user-api';
import { getDocs, updateDoc, query } from "firebase/firestore";
import fireToast from "@/services/toast";


jest.mock("@/services/toast", () => {
    return {
        __esModule: true, 
        default: jest.fn()
    };
});

jest.mock("@/lib/firebase", () => ({
    db: {}
}));
jest.mock('firebase/firestore', () => ({
    getFirestore: jest.fn(),
    collection: jest.fn(),
    addDoc: jest.fn(),
    getDocs: jest.fn(() => Promise.resolve({ empty: true })),
    where: jest.fn(),
    query: jest.fn(),
    doc: jest.fn(),
    updateDoc: jest.fn(),
}));
describe("updateUser", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should not proceed with update if name is not in the data object and should show an error toast", async () => {
        const data = { email: "test@example.com" };
        await updateUser(data, 'Player');
        expect(fireToast).toHaveBeenCalledWith('error', 'Please change at least one field!');
    });

    it("should not proceed with update if profile validation fails and should show an error toast", async () => {
        const data = { name: "Test", email: "test@example.com", gender: "other" };
        await updateUser(data, 'Coach');
        expect(fireToast).toHaveBeenCalledWith('error', 'Please complete your profile!');
    });

    it("should proceed with update if the player role and data are valid", async () => {
        const data = {
            name: "Test",
            email: "test@example.com",
            phone: "1234567890",
            dateOfBirth: '2000-01-01',
            gender: "male",
            countryCode: "US",
            club: "Test Club"
        };
        const mockQuerySnapshot = {
            forEach: jest.fn((callback) => {
                callback({ id: '123' });
            })
        };
        getDocs.mockResolvedValue(mockQuerySnapshot);

        await updateUser(data, 'Player');
        expect(getDocs).toHaveBeenCalled();
        expect(updateDoc).toHaveBeenCalled();
        expect(fireToast).toHaveBeenCalledWith('success', 'Profile updated successfully!');
    });

    it('should show an error toast if name is not changed in the data object', async () => {
        const data = { email: 'test@example.com' };
        const userRoleValue = 'Player';

        await updateUser(data, userRoleValue);

        expect(fireToast).toHaveBeenCalledWith('error', 'Please change at least one field!');
    });

    it('should show an error toast if mandatory fields are missing based on the user role', async () => {
        const data = { name: 'Test', email: 'test@example.com', dateOfBirth: '2000-01-01' };
        const userRoleValue = 'Coach';

        await updateUser(data, userRoleValue);

        expect(fireToast).toHaveBeenCalledWith('error', 'Please complete your profile!');
    });

    it('should update a coach’s profile when all required fields are present', async () => {
        const data = {
            name: 'Coach Name',
            email: 'coach@example.com',
            phone: '987654321',
            dateOfBirth: '1980-01-01',
            gender: 'female',
            countryCode: 'CA',
            club: 'Super Club'
        };
        const userRoleValue = 'Coach';
        const mockGetDocsResponse = { forEach: jest.fn(callback => callback({ id: 'mockCoachId' })) };
        getDocs.mockResolvedValue(mockGetDocsResponse);

        await updateUser(data, userRoleValue);

        expect(query).toHaveBeenCalled();
        expect(updateDoc).toHaveBeenCalledTimes(1);
        expect(fireToast).toHaveBeenCalledWith('success', 'Profile updated successfully!');
    });

});