import { db, auth } from '@/lib/firebase';
import {
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  startAt,
  where,
} from 'firebase/firestore';

// Function to fetch data from Firestore
const fetchData = async (
  collectionName: string,
  queryField: string | null = null,
  queryValue: string | null = null
) => {
  let data;
  if (queryField && queryValue) {
    const q = query(
      collection(db, collectionName),orderBy(queryField),startAt(queryValue),
      endAt(queryValue + "\uf8ff")

    );
    data = await getDocs(q);
  } else {
    data = await getDocs(collection(db, collectionName));
  }
  return data;
};

// Function to find clubs by name
const findByName = async ({ name }: { name: string }) => {
  try {
    if (name.length !== 0) {
      // Fetch clubs by name
      const clubs = await fetchData('club', 'name', name);
      if (clubs.empty) {
        return 'Name does not exist';
      }
      return clubs;
    } else {
      // Fetch all clubs if name is not provided
      const clubs = await fetchData('club');
      return clubs;
    }
  } catch (error: any) {
    return error.message;
  }
};

// Function to find coaches by name
const findCoachByName = async ({ name }: { name: string }) => {
  try {
    if (name.length !== 0) {
      // Fetch coaches by display name
      const coaches = await fetchData('coach', 'displayName', name);
      if (coaches.empty) {
        return 'Coach does not exist';
      }
      return coaches;
    } else {
      // Fetch all coaches if name is not provided
      const coaches = await fetchData('coach');
      return coaches;
    }
  } catch (error: any) {
    return error.message;
  }
};

// Function to add a coach to favorites
const favouriteCoach = async (coachRef: any) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return 'User not authenticated.';
    }
    const playerRef = doc(db, 'player', currentUser.uid);
    const playerSnap = await getDoc(playerRef);
    const coachSnap = await getDoc(doc(db, 'coach', coachRef));
    if (!coachSnap.exists()) {
      return 'There is no coach.';
    }
    if (!playerSnap.exists()) {
      return 'Player does not exist.';
    }
    const playerData = playerSnap.data();
    const coachData = coachSnap.data();
    const updatedFavoriteCoaches = [...(playerData.favoriteCoach || [])];
    const updatedCoachList = [...(coachData.followedPlayer || [])];
    if (updatedFavoriteCoaches.includes(coachRef)) {
      return 'Coach already exists in the favorite list.';
    }
    if (updatedCoachList.includes(currentUser.uid)) {
      return "Player already exists in coach's followed list.";
    }
    await runTransaction(db, async (transaction) => {
      transaction.update(playerRef, {
        favoriteCoach: [...updatedFavoriteCoaches, coachRef],
      });
      transaction.update(doc(db, 'coach', coachRef), {
        followedPlayer: [...updatedCoachList, currentUser.uid],
      });
    });
    return 'Player updated favourite Coach successfully!';
  } catch (error: any) {
    return error.message;
  }
};

// Function to remove a coach from favorites
const unfavoriteCoach = async (coachRef: any) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return 'User not authenticated.';
    }
    const playerRef = doc(db, 'player', currentUser.uid);
    const playerSnap = await getDoc(playerRef);
    const coachSnap = await getDoc(doc(db, 'coach', coachRef));
    if (!coachSnap.exists()) {
      return 'There is no coach.';
    }
    if (!playerSnap.exists()) {
      return 'Player does not exist.';
    }
    const playerData = playerSnap.data();
    const coachData = coachSnap.data();
    const updatedFavoriteCoaches = [...(playerData.favoriteCoach || [])];
    const index = updatedFavoriteCoaches.indexOf(coachRef);
    if (index === -1) {
      return 'Coach is not in the favorite list.';
    }
    const updatedCoachList = [...(coachData.followedPlayer || [])];
    const coachIndex = updatedCoachList.indexOf(currentUser.uid);
    if (coachIndex === -1) {
      return 'Player is not following the coach.';
    }
    await runTransaction(db, async (transaction) => {
      transaction.update(playerRef, {
        favoriteCoach: updatedFavoriteCoaches.filter(
          (coach) => coach !== coachRef
        ),
      });
      transaction.update(doc(db, 'coach', coachRef), {
        followedPlayer: updatedCoachList.filter(
          (player) => player !== currentUser.uid
        ),
      });
    });
    return 'Coach removed from favorites successfully!';
  } catch (error: any) {
    return error.message;
  }
};

// Function to retrieve favorite coaches of the current player
const favoriteCoachList = async () => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return 'User not authenticated.';
    }
    const playerRef = doc(db, 'player', currentUser.uid);
    const playerSnap = await getDoc(playerRef);
    if (!playerSnap.exists()) {
      return 'Player does not exist.';
    }

    const playerData = playerSnap.data();

    // Array to store promises for fetching coach data
    const coachPromises = playerData.favoriteCoach.map(async (id: any) => {
      try {
        const coachQuery = query(
          collection(db, 'coach'),
          where('__name__', '==', id)
        );
        const coachSnapshot = await getDocs(coachQuery);
        const coachDataArray = coachSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return coachDataArray;
      } catch (error) {
        // Handle error if fetching coach data fails
        return null; // or throw error if desired
      }
    });

    // Wait for all coach data promises to resolve
    const coaches = await Promise.all(coachPromises);

    // Log the fetched coach data

    return coaches;
  } catch (error: any) {
    return error.message;
  }
};

export {
  findByName,
  favouriteCoach,
  findCoachByName,
  unfavoriteCoach,
  favoriteCoachList,
  fetchData,
};
