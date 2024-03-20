import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
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

const prepareLessonData = (lessonData: any, startTime: string, deadLineTime: string) => {
    const datePartsStartDate = lessonData.startDate.split("/");
    const timePartsStartDate = startTime.split(":");
    const timePartsDeadLineTime = deadLineTime.split(":");
    const startDate = new Date(parseInt(datePartsStartDate[2], 10), parseInt(datePartsStartDate[0], 10) - 1, parseInt(datePartsStartDate[1], 10), parseInt(timePartsStartDate[0], 10), parseInt(timePartsStartDate[1], 10));
    const datePartsEndDate = lessonData.endDate.split("/");
    const endDate = new Date(parseInt(datePartsEndDate[2], 10), parseInt(datePartsEndDate[0], 10) - 1, parseInt(datePartsEndDate[1], 10), 23, 59);
    const datePartsSignInDeadLine = lessonData.signInDeadLine.split("/");
    const signInDeadLine = new Date(parseInt(datePartsSignInDeadLine[2], 10), parseInt(datePartsSignInDeadLine[0], 10) - 1, parseInt(datePartsSignInDeadLine[1], 10), parseInt(timePartsDeadLineTime[0], 10), parseInt(timePartsDeadLineTime[1], 10));
    const tagsArray = lessonData.tags.split(',').map(tag => tag.trim());
    return {
        ...lessonData,
        minAge: parseInt(lessonData.minAge),
        minPeople: parseInt(lessonData.minPeople),
        maxPeople: parseInt(lessonData.maxPeople),
        startDate: startDate,
        endDate: endDate,
        tags: tagsArray,
        signInDeadLine: signInDeadLine
    };
};

const storeLesson = async (lessonData: any, startTime: string, deadLineTime: string) => {
    const lesson = prepareLessonData(lessonData, startTime, deadLineTime);
    try {
        await addDoc(lessonsRef, lesson);
        fireToast('success', 'New training added successfully !');
    } catch (error) {
        fireToast('error', 'Something went wrong !');
        console.log(error);
    }
};

const updateLesson = async (id: string, updatedLessonData: any, startTime: string, deadLineTime: string) => {
    const docRef = doc(db, "lesson", id);
    const lessonToUpdate = prepareLessonData(updatedLessonData, startTime, deadLineTime);
    try {
        await updateDoc(docRef, lessonToUpdate);
        fireToast('success', 'Lesson updated successfully !');
    } catch (error) {
        fireToast('error', 'Something went wrong while updating the lesson !');
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

const deleteLessonById = async (id: string) => {
    const docRef = doc(db, "lesson", id);
    try {
        await deleteDoc(docRef);
    } catch (error) {
        console.log('Error deleting the lesson')
    }
}

export { getLessonsByCoachId, storeLesson, getLessonById, deleteLessonById, updateLesson };

