import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { retrieveData } from './localStorage';

const getLessonsByCoachId = async () => {
    const coachId = await retrieveData('userID')
    const lessonsRef = collection(db, "lesson");
    const q = query(lessonsRef, where("coachId", "==", coachId));
    try {
        const querySnapshot = await getDocs(q);
        const lessons : any = [];
        querySnapshot.forEach((doc) => {
            lessons.push({ id: doc.id, ...doc.data() });
        });
        return lessons;
    } catch (error) {
        console.error("Error getting lessons: ", error);
        return [];
    }
};
export { getLessonsByCoachId };

