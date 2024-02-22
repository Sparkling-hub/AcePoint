import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import fireToast from "@/services/toast";

const updateUser = async (data: any, userRoleValue: string) => {
    try {
        if (!data.hasOwnProperty("name")) {
            fireToast('error', 'Please change at least one field!');
            return;
        }
        const userData: any = {
            displayName: data.name,
            phoneNumber: data.phone,
            birthday: data.dateOfBirth,
            gender: data.gender,
            countryCode: data.countryCode,
            club: data.club
        };
        const isProfileComplete = validateProfile(userData, userRoleValue);

        if (!isProfileComplete) {
            fireToast('error', 'Please complete your profile!');
            return;
        }
        if (userRoleValue === 'Player') {
            const playerQuerySnapshot = await getDocs(query(collection(db, 'player'), where('email', '==', data.email)));
            playerQuerySnapshot.forEach(async (document) => {
                await updateDoc(doc(collection(db, 'player'), document.id), userData)
            });
        } else {
            const coachQuerySnapshot = await getDocs(query(collection(db, 'coach'), where('email', '==', data.email)));
            coachQuerySnapshot.forEach(async (document) => {
                await updateDoc(doc(collection(db, 'coach'), document.id), userData)
            });
        }
        fireToast('success', 'Profile updated successfully!');
    } catch (error) {
        fireToast('error', 'Error updating profile!');
        console.error('Error updating profile:', error);
    }
}
function validateProfile(userData: any, profileType: string): boolean {
    const requiredFields = profileType === "Coach" ? ['birthday', 'club', 'gender'] : ['birthday', 'gender'];
    for (const field of requiredFields) {
        if (!userData[field]) {
            return false;
        }
    }
    return true;
}
export { updateUser };
