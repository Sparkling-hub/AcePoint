import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc, getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import fireToast from '@/services/toast';

// Define the reference to the 'lesson' collection in the Firestore database
const lessonsRef = collection(db, "lesson");

// Function to get all lessons by coach ID
const getLessonsByCoachId = async (coachId: string) => {

    // Create a query to get all lessons where the coachId matches the retrieved coachId
    const q = query(lessonsRef, where("coachId", "==", coachId));
    try {
        // Execute the query and get the query snapshot
        const querySnapshot = await getDocs(q);
        // Initialize an empty array to store the lessons
        const lessons: any = [];
        // Loop through each document in the query snapshot
        querySnapshot.forEach((doc) => {
            // Push each document data into the lessons array, along with the document ID
            lessons.push({ id: doc.id, ...doc.data() });
        });
        // Return the lessons array
        return lessons;
    } catch (error) {
        // Log an error message if there was an error getting the lessons
        console.error("Error getting lessons: ", error);
        // Return an empty array
        return [];
    }
};

// Function to prepare lesson data
const prepareLessonData = (lessonData: any, startTime: string, deadLineTime: string) => {
    // Split the start date, end date, and sign in deadline into parts
    const datePartsStartDate = lessonData.startDate.split("/");
    const timePartsStartDate = startTime.split(":");
    const timePartsDeadLineTime = deadLineTime.split(":");
    const datePartsEndDate = lessonData.endDate.split("/");
    const datePartsSignInDeadLine = lessonData.signInDeadLine.split("/");

    // Create new Date objects for start date, end date, and sign in deadline
    const startDate = new Date(parseInt(datePartsStartDate[2], 10), parseInt(datePartsStartDate[0], 10) - 1, parseInt(datePartsStartDate[1], 10), parseInt(timePartsStartDate[0], 10), parseInt(timePartsStartDate[1], 10));
    const endDate = new Date(parseInt(datePartsEndDate[2], 10), parseInt(datePartsEndDate[0], 10) - 1, parseInt(datePartsEndDate[1], 10), 23, 59);
    const signInDeadLine = new Date(parseInt(datePartsSignInDeadLine[2], 10), parseInt(datePartsSignInDeadLine[0], 10) - 1, parseInt(datePartsSignInDeadLine[1], 10), parseInt(timePartsDeadLineTime[0], 10), parseInt(timePartsDeadLineTime[1], 10));

    // Split the tags into an array and trim each tag
    const tagsArray = lessonData.tags.split(',').map(tag => tag.trim());

    // Return the lesson data with the new Date objects and tags array
    return {
        ...lessonData,
        minAge: parseInt(lessonData.minAge),
        minPeople: parseInt(lessonData.minPeople),
        maxPeople: parseInt(lessonData.maxPeople),
        startDate: startDate,
        endDate: endDate,
        tags: tagsArray,
        signInDeadLine: signInDeadLine,
        players: []
    };
};

// Function to store a new lesson
const storeLesson = async (lessonData: any, startTime: string, deadLineTime: string) => {
    // Prepare the lesson data
    const lesson = prepareLessonData(lessonData, startTime, deadLineTime);
    try {
        // Add the prepared lesson data to the lessons collection
        await addDoc(lessonsRef, lesson);
        // Show a success message
        fireToast('success', 'New training added successfully !');
    } catch (error) {
        // Show an error message if something went wrong
        fireToast('error', 'Something went wrong !');
        // Log the error
        console.log(error);
    }
};

// Function to update a lesson
const updateLesson = async (id: string, updatedLessonData: any, startTime: string, deadLineTime: string) => {
    // Create a reference to the lesson document in the Firestore database
    const docRef = doc(db, "lesson", id);
    // Prepare the updated lesson data
    const lessonToUpdate = prepareLessonData(updatedLessonData, startTime, deadLineTime);
    try {
        // Update the lesson document in the Firestore database
        await updateDoc(docRef, lessonToUpdate);
        // Show a success message
        fireToast('success', 'Lesson updated successfully !');
    } catch (error) {
        // Show an error message if something went wrong
        fireToast('error', 'Something went wrong while updating the lesson !');
        // Log the error
        console.log(error);
    }
};
// Function to add a player to a lesson
const addPlayerToLesson = async (id: string, playerId: string) => {
    // Create a reference to the lesson document in the Firestore database
    const docRef = doc(db, "lesson", id);
    // Get the lesson by its ID
    const lesson = await getLessonById(id)
    // Check if the lesson exists
    if (lesson) {
        // Add the player to the lesson
        lesson.players.push(playerId)
        try {
            // Update the lesson document in the Firestore database
            await updateDoc(docRef, lesson);
            // Show a success message
            fireToast('success', 'Joined !');
        } catch (error) {
            // Show an error message if something went wrong
            fireToast('error', 'Something went wrong !');
            // Log the error
            console.log(error);
        }
    }
};
// Function to remove a player from a lesson
const removePlayerToLesson = async (id: string, playerId: string) => {
    // Create a reference to the lesson document in the Firestore database
    const docRef = doc(db, "lesson", id);
    // Get the lesson by its ID
    const lesson = await getLessonById(id)
    // Check if the lesson exists
    if (lesson) {
        // Find the index of the player in the lesson's players array
        const index = lesson.players.indexOf(playerId);
        // If the player is in the lesson's players array
        if (index > -1) {
            // Remove the player from the lesson's players array
            lesson.players.splice(index, 1)
        }
        try {
            // Update the lesson document in the Firestore database
            await updateDoc(docRef, lesson);
            // Show a success message
            fireToast('success', 'Canceled !');
        } catch (error) {
            // Show an error message if something went wrong
            fireToast('error', 'Something went wrong !');
            // Log the error
            console.log(error);
        }
    }
};
// Function to get a lesson by its ID
const getLessonById = async (id: string) => {
    // Create a reference to the lesson document in the Firestore database
    const docRef = doc(db, "lesson", id);
    // Get the document snapshot
    const docSnap = await getDoc(docRef);
    // Check if the document exists
    if (docSnap.exists()) {
        // Return the data of the document
        return docSnap.data();
    } else {
        // Log a message if the document does not exist
        console.log("No such document!");
    }
}

// Function to delete a lesson by its ID
const deleteLessonById = async (id: string) => {
    // Create a reference to the lesson document in the Firestore database
    const docRef = doc(db, "lesson", id);
    try {
        // Delete the lesson document in the Firestore database
        await deleteDoc(docRef);
    } catch (error) {
        // Log an error message if something went wrong
        console.log('Error deleting the lesson')
    }
}

// Function to get all lessons by player ID
const getLessonsByPlayerId = async (playerId: string) => {
    // Create a query to get all lessons where the players array contains the player ID
    const q = query(lessonsRef, where("players", "array-contains", playerId));
    try {
        // Get the documents that match the query
        const querySnapshot = await getDocs(q);
        // Initialize an empty array to store the lessons
        const lessons = [];
        // Loop through each document in the query snapshot
        querySnapshot.forEach((doc) => {
            // Push the document data (including the ID) to the lessons array
            lessons.push({ id: doc.id, ...doc.data() });
        });
        // Return the array of lessons
        return lessons;
    } catch (error) {
        // Log an error message if something went wrong
        console.error("Error getting lessons: ", error);
        // Return an empty array
        return [];
    }
};
// Export all the functions
export { getLessonsByCoachId, storeLesson, getLessonById, deleteLessonById, updateLesson, addPlayerToLesson, removePlayerToLesson, getLessonsByPlayerId };

