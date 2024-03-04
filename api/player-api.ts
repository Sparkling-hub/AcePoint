import {db,auth } from '@/lib/firebase'
import { collection,doc,getDoc,getDocs,query,runTransaction,where } from 'firebase/firestore';


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
        const coachRefDoc = doc(db, 'coach', coachRef);
        const coachSnap = await getDoc(coachRefDoc);

        if (!coachSnap.exists()) {
            return "There is no coach.";
        }

        if (!playerSnap.exists()) {
            return "Player does not exist.";
        }

        const playerData = playerSnap.data();
        const coachData = coachSnap.data();

        const updatedFavoriteCoaches = [...(playerData.favoriteCoach || [])];
        const updatedCoachList = [...(coachData.followedPlayer || [])];

        if (updatedFavoriteCoaches.includes(coachRef)) {
            return "Coach already exists in the favorite list.";
        }

        if (updatedCoachList.includes(currentUser.uid)) {
            return "Player already exists in coach's followed list.";
        }

        const transactionResult = await runTransaction(db, async (transaction) => {
            // Update player's favorite coach
            transaction.update(playerRef, {
                favoriteCoach: [...updatedFavoriteCoaches, coachRef]
            });

            // Update coach's list of followed players
            transaction.update(coachRefDoc, {
                followedPlayer: [...updatedCoachList, currentUser.uid]
            });
        });

        return "Player updated favourite Coach successfully!";
    } catch (error: any) {
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
        const coachRefDoc = doc(db, 'coach', coachRef);
        const coachSnap = await getDoc(coachRefDoc);
        if(!coachSnap.exists()){
            return "There is no coach.";
        }
        if (!playerSnap.exists()) {
            return "Player does not exist.";
        }
        const playerData = playerSnap.data();
        const coachData = coachSnap.data();
        const updatedFavoriteCoaches = [...(playerData.favoriteCoach || [])];
        const index = updatedFavoriteCoaches.indexOf(coachRef);
        if (index === -1) {
            return "Coach is not in the favorite list.";
        }

        const updateCoachList = [...(coachData.followedPlayer || [])];
        const coachIndex = updateCoachList.indexOf(currentUser.uid);
        if (coachIndex === -1) {
            return "Player is not following the coach.";
        }

        const transactionResult = await runTransaction(db, async (transaction) => {
            // Update player's favorite coach
            transaction.update(playerRef, {
                favoriteCoach: updatedFavoriteCoaches.filter(coach => coach !== coachRef)
            });

            // Update coach's list of followed players
            transaction.update(coachRefDoc, {
                followedPlayer: updateCoachList.filter(player => player !== currentUser.uid)
            });
        });

        return "Coach removed from favorites successfully!";
    } catch (error:any) {
        return error.message;
    }
};

const favoriteCoachList = async () => {
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
        return(updatedFavoriteCoaches)        
    } catch (error:any) {
        return error.message;
    }
};
export { findByName,favouriteCoach,findCoachByName,unfavoriteCoach,favoriteCoachList}