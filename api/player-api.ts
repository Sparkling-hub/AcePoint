import {db,auth } from '@/lib/firebase'
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';


const findByName = async ({name}: { name: string }) => {
    try {
        if(name.length !==0){  
        const data = query(collection(db, 'club'), where('name', '==', name));
        const clubs = await getDocs(data);
        if (clubs.empty) {
            // return there is no name if name dos not exist in db
            return("name dose not exist")
        }
        // return the filtered data
        return clubs
        }
        // return the all data if there is no name
        if(name.length ===0){
            const data = collection(db, 'club');
            const clubs = await getDocs(data);
            return clubs
        }
    } catch (error: any) {
        return error.message;
    }
};
const findCoachByName = async ({name}: { name: string }) => {
    try {
        if(name.length !==0){
        const data = query(collection(db, 'coach'), where('displayName', '==', name));
        const coaches = await getDocs(data);
        if (coaches.empty) {
            return("coach does not exist")
        }
        return (coaches)
        }
        if(name.length ===0){
        const data = collection(db, 'coach');
        const coaches = await getDocs(data);
        return coaches
    }
} catch (error: any) {
        return error.message;
    }
};
const favouriteCoach = async (coachRef: any) => {
    try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            return "User not authenticated.";
        }

        const playerRef = doc(db, 'player', currentUser.uid);
        const playerSnap = await getDoc(playerRef);

        if (!playerSnap.exists()) {
            return "Player does not exist.";
        }

        const playerData = playerSnap.data();
        const updatedFavoriteCoaches = [...(playerData.favoriteCoach || [])];

        if (updatedFavoriteCoaches.includes(coachRef)) {
            return "Coach already exists in the favorite list.";
        }

        updatedFavoriteCoaches.push(coachRef);
        const updatedData = {
            ...playerData,
            favoriteCoach: updatedFavoriteCoaches
        };

        await updateDoc(playerRef, updatedData);
        return "Player updated favourite Coach successfully!";
    } catch (error:any) {
        return error.message;
    }
};

const unfavoriteCoach = async (coachRef: any) => {
    try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            return "User not authenticated.";
        }
        const playerRef = doc(db, 'player', currentUser.uid);
        const playerSnap = await getDoc(playerRef);

        if (!playerSnap.exists()) {
            return "Player does not exist.";
        }
        const playerData = playerSnap.data();
        const updatedFavoriteCoaches = [...(playerData.favoriteCoach || [])];
        const index = updatedFavoriteCoaches.indexOf(coachRef);
        if (index === -1) {
            return "Coach is not in the favorite list.";
        }
        updatedFavoriteCoaches.splice(index, 1);
        const updatedData = {
            ...playerData,
            favoriteCoach: updatedFavoriteCoaches
        };
        await updateDoc(playerRef, updatedData);
        return "Coach removed from favorites successfully!";
    } catch (error:any) {
        return error.message;
    }
};

// Assuming you have the coach's reference, you can call the function like this:
const coachRef = "0nHOThTHflgAdfCrqHPVPTeoJYE2"; // Replace coachReference with the actual reference to the coach
const coachRef1 = "ka"; // Replace coachReference with the actual reference to the coach
//  favouriteCoach(coachRef1);
//  unfavoriteCoach(coachRef)





export { findByName,favouriteCoach,findCoachByName,unfavoriteCoach}