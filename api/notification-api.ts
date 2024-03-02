import { db } from "@/lib/firebase";
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { retrieveData } from "./localStorage";

const findOrCreateNotification = async (userId: string, type: string, checked: boolean) => {
    try {
        const userType = await retrieveData('userType')
        const notifCollection = collection(db, 'notification')
        const PlayerNotifQuery = query(notifCollection, where('type', '==', type), where('playerId', '==', userId))
        const CoachNotifQuery = query(notifCollection, where('type', '==', type), where('coachId', '==', userId))
        let result = null
        result = await (userType === 'Player' ? getDocs(PlayerNotifQuery) : getDocs(CoachNotifQuery));
        if (result.empty) {
            // If notification doesn't exist, create a new one
            userType === 'Player' ? await setDoc(doc(notifCollection), {
                playerId: userId,
                type: type,
                checked: checked
            }) : await setDoc(doc(notifCollection), {
                coachId: userId,
                type: type,
                checked: checked
            })
        } else {
            result.docs.forEach(async (element) => {
                await updateDoc(element.ref, {
                    ...element.data(),
                    checked: checked
                })
            });
        }
    } catch (error) {
        console.error('Error finding or creating notification:', error);
    }
};
export { findOrCreateNotification }