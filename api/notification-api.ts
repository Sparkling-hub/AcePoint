import { db } from "@/lib/firebase";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { retrieveData } from "./localStorage";

const findOrCreateNotification = async (type: string, checked: boolean) => {
    try {
        // Retrieve user's email and user type from local storage
        const email = await retrieveData('email')
        const userType = await retrieveData('userType')

        // Determine the collection based on the user type
        const userCollection = userType === 'Player' ? collection(db, 'player') : collection(db, 'coach')

        // Query Firestore to find the user document with the matching email
        const notificationQuery = query(userCollection, where('email', '==', email))
        const result = await getDocs(notificationQuery)

        // If the user document exists, update it with the specified type and checked values
        if (!result.empty) {
            result.docs.forEach(async (element) => {
                await updateDoc(element.ref, {
                    ...element.data(),
                    [type]: checked
                })
            });
        }
    } catch (error) {
        // Handle errors by logging them to the console
        console.error('Error finding or creating notification:', error);
    }
};
export { findOrCreateNotification }