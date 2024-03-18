import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, getDoc, doc } from "firebase/firestore";
import { retrieveData } from './localStorage';
import fireToast from '@/services/toast';

const lessonsRef = collection(db, "lesson");

const getLessonsByCoachId = async () => {
    const coachId = await retrieveData('userID')
    const q = query(lessonsRef, where("coachId", "==", coachId));
    try {
        const querySnapshot = await getDocs(q);
        const lessons: any = [];
        querySnapshot.forEach((doc) => {
            lessons.push({ id: doc.id, ...doc.data() });
        });
        return lessons;
    } catch (error) {
        console.error("Error getting lessons: ", error);
        return [];
    }
};

const storeLesson = async (lessonData: any, startTime: string) => {
    const datePartsStartDate = lessonData.startDate.split("/")
    const timePartsStartDate = startTime.split(":")
    const startDate = new Date(parseInt(datePartsStartDate[2], 10), parseInt(datePartsStartDate[0], 10) - 1, parseInt(datePartsStartDate[1], 10), parseInt(timePartsStartDate[0], 10), parseInt(timePartsStartDate[1], 10));
    const datePartsEndDate = lessonData.endDate.split("/")
    const endDate = new Date(parseInt(datePartsEndDate[2], 10), parseInt(datePartsEndDate[0], 10) - 1, parseInt(datePartsEndDate[1], 10));
    const duration = lessonData.duration;
    const tagsArray = lessonData.tags.split(',').map(tag => tag.trim());
    const lesson = {
        ...lessonData,
        minAge: parseInt(lessonData.minAge),
        minPeople: parseInt(lessonData.minPeople),
        maxPeople: parseInt(lessonData.maxPeople),
        duration: duration,
        startDate: startDate,
        endDate: endDate,
        players: [],
        tags: tagsArray
    }
    try {
        await addDoc(lessonsRef, lesson);
        fireToast('success', 'New training added successfully !')
    } catch (error) {
        fireToast('error', 'Something went wrong !')
        console.log(error);

    }
};
const getLessonById = async (id: string) => {
    const docRef = doc(db, "lesson", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
    }
}

export { getLessonsByCoachId, storeLesson, getLessonById };

