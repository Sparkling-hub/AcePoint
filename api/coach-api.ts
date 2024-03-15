import { db } from '@/lib/firebase';
import { getDoc, doc } from "firebase/firestore";

const getCoachById = async (id: string) => {
    const docRef = doc(db, "coach", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
    }
}

export { getCoachById };

