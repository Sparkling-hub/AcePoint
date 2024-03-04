import { db } from "@/lib/firebase";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { retrieveData } from "./localStorage";

const findOrCreateNotification = async (type: string, checked: boolean) => {
    try {
        const email = await retrieveData('email')
        const userType = await retrieveData('userType')
        const userCollection = userType === 'Player' ? collection(db, 'player') : collection(db, 'coach')
        const notificationQuery = query(userCollection, where('email', '==', email))
        const result = await getDocs(notificationQuery)

        if (!result.empty) {
            result.docs.forEach(async (element) => {
                await updateDoc(element.ref, {
                    ...element.data(),
                    [type]: checked
                })
            });
        }
    } catch (error) {
        console.error('Error finding or creating notification:', error);
    }
};
export { findOrCreateNotification }