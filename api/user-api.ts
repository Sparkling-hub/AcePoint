import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import fireToast from "@/services/toast";

/**
 * Function to update user profile data in Firestore.
 * @param data - The user profile data to be updated.
 * @param userRoleValue - The role of the user ('Player' or 'Coach').
 */
const updateUser = async (data: any, userRoleValue: string) => {
    try {
        // Check if the 'name' field is present in the data object
        if (!data.hasOwnProperty("name")) {
            fireToast('error', 'Please complete your profile.');
            return;
        }

        // Prepare user data object with required fields for profile update
        const userData: any = {
            displayName: data.name,
            phoneNumber: data.phone,
            birthday: data.dateOfBirth,
            gender: data.gender,
            countryCode: data.countryCode,
            club: data.club
        };

        // Validate if the profile data is complete based on user role
        const isProfileComplete = validateProfile(userData, userRoleValue);

        // If profile is not complete, show error toast and return
        if (!isProfileComplete) {
            fireToast('error', 'Please complete your profile!');
            return;
        }

        // Update profile data in Firestore based on user role
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

        // Show success toast on profile update
        fireToast('success', 'Profile updated successfully!');
    } catch (error) {
        // Show error toast on profile update failure
        fireToast('error', 'Error updating profile!');
        console.error('Error updating profile:', error);
        throw error;
    }
}

/**
 * Function to validate user profile data completeness.
 * @param userData - The user profile data object to be validated.
 * @param profileType - The type of profile ('Player' or 'Coach').
 * @returns A boolean indicating if the profile data is complete.
 */
function validateProfile(userData: any, profileType: string): boolean {
    // Define required fields based on profile type
    const requiredFields = profileType === "Coach" ? ['birthday', 'club', 'gender'] : ['birthday', 'gender'];

    // Check if all required fields are present in the user data
    for (const field of requiredFields) {
        if (!userData[field]) {
            return false;
        }
    }
    return true;
}

export { updateUser };
