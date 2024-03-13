import { getAuth, updatePassword } from "firebase/auth";
import fireToast from "./toast";
import { handleLogout } from "@/components/auth/Logout";

const changePassword = (newPassword: string) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
        return;
    }
    updatePassword(user, newPassword).then(async () => {
        await handleLogout()
        fireToast("success", "Password updated successfully")
    }).catch((error: Error) => {
        fireToast("error", "Something went wrong!")
    });
}

export default changePassword;