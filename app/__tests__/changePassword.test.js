import { expect, jest, describe, it, afterEach } from '@jest/globals';
import { getAuth, updatePassword } from "firebase/auth";
import { handleLogout } from "@/components/auth/Logout";
import changePassword from "@/services/changePassword";

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    updatePassword: jest.fn()
}));

jest.mock("@/services/toast", () => {
    return {
        __esModule: true,
        default: jest.fn()
    };
});

jest.mock('@/components/auth/Logout', () => ({
    handleLogout: jest.fn()
}))

jest.mock('tamagui', () => ({
    YStack: jest.fn(),
    Text: jest.fn(),
    XStack: jest.fn(),
    Button: jest.fn(),
    Input: jest.fn()
}));

describe('changePassword', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });
    it('updates the user password', async () => {
        const newPassword = 'newPassword123';
        const user = {};
        getAuth.mockReturnValue({ currentUser: user });
        updatePassword.mockResolvedValue();

        await changePassword(newPassword);

        expect(updatePassword).toHaveBeenCalledWith(user, newPassword);
        expect(handleLogout).toHaveBeenCalled();
    });

})