import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import fireToast from "@/services/toast";

const updateUser = async (data: any) => {
    try {
        const userData = {
            displayName: data.name,
            phoneNumber: data.phone,
            birthday: data.dateOfBirth,
            gender: data.gender,
            countryCode: data.countryCode,
            club: data.club
        };

        const playerQuerySnapshot = await getDocs(
            query(collection(db, 'player'), where('email', '==', data.email))
        );

        const coachQuerySnapshot = await getDocs(
            query(collection(db, 'coach'), where('email', '==', data.email))
        );

        if (!playerQuerySnapshot.empty) {
            playerQuerySnapshot.forEach(async (document) => {
                await updateDoc(doc(collection(db, 'player'), document.id), userData);
            });
            fireToast('success','Profile updated successfully!')
        } else if (!coachQuerySnapshot.empty) {
            coachQuerySnapshot.forEach(async (document) => {
                await updateDoc(doc(collection(db, 'coach'), document.id), userData);
            });
            fireToast('success','Profile updated successfully!')
        } else {
            fireToast('error','Profile not found!')
        }
    } catch (error) {
        fireToast('error','Error updating profile!')
        console.error('Error updating profile:', error);
        throw error;
    }
}

export { updateUser };
