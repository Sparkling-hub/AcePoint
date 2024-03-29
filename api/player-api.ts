import { db, auth } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  where,
} from 'firebase/firestore';
import GetLocation from 'react-native-get-location';

const calculateDistance = (
  currentLat: number,
  currentLon: number,
  data: any,
  id: string,
  radius: number
): any => {
  const earthRadius = 6371; // Earth's radius in kilometers
  // Convert latitude and longitude from degrees to radians
  const lat1Rad = (currentLat * Math.PI) / 180;
  const lon1Rad = (currentLon * Math.PI) / 180;
  const lat2Rad = (data.latitude * Math.PI) / 180;
  const lon2Rad = (data.longitude * Math.PI) / 180;
  // Haversine formula
  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) *
    Math.cos(lat2Rad) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  if (distance <= radius === true) {
    console.log('In Range', data);
    return { ...data, id };
  } else {
    console.log('Not in Range', data);
  }
};
const distanceCalculation = async (
  currentLatitude: number,
  currentLongitude: number,
  radious: number
) => {
  try {
    const clubs = await getDocs(collection(db, 'club'));
    if (clubs.empty) {
      return [];
    }
    const distancePromises = clubs.docs.map((doc) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const distance = calculateDistance(
            currentLatitude,
            currentLongitude,
            doc.data(),
            doc.id,
            radious
          );
          resolve(distance);
        }, 1000);
      });
    });

    const distances = await Promise.all(distancePromises);
    const filteredDistances = distances.filter(
      (distance) => distance !== undefined
    );
    // console.log("distances"), filteredDistances;
    return filteredDistances;
  } catch (error) {
    return error;
  }
};

const locationPosition = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: false,
      timeout: 60000,
    })
      .then((location) => {
        const { latitude, longitude } = location;
        resolve({ latitude, longitude });
      })
      .catch((error) => {
        const { code, message } = error;
        reject(new Error(`Location error: ${code} - ${message}`)); // Create a new Error object
      });
  });
};

const filterCoach = async (rating: number, level: number, tags: string[]) => {
  let Data;
  let result: any = [];
  let q;

  if (rating === 0 && level !== 0) {
    q = query(collection(db, 'coach'), where('level', '==', level));
  } else if (rating !== 0 && level === 0) {
    q = query(collection(db, 'coach'), where('rating', '==', rating));
  } else if (rating === 0 && level === 0) {
    q = collection(db, 'coach');
  } else {
    q = query(
      collection(db, 'coach'),
      where('rating', '==', rating),
      where('level', '==', level)
    );
  }

  try {
    const querySnapshot = await getDocs(q);
    const coaches = querySnapshot.docs;
    if (tags.length !== 0) {
      coaches.forEach((doc) => {
        if (tags.some((tag) => doc.data().tags.includes(tag))) {
          Data = doc.data();
          Data.id = doc.id;
          return result.push(Data);
        }
      });
    } else if (rating === 0 && level === 0 && tags.length === 0) {
      return result;
    } else {
      coaches.forEach((doc) => {
        Data = doc.data();
        Data.id = doc.id;
        return result.push(Data);
      });
    }

    if (result.length > 0) {
      console.log('Found coaches:', coaches);
      console.log('result:', result);
      return result;
    } else {
      console.log('No coaches found');
      return [];
    }
  } catch (error) {
    console.log('Error getting coaches:', error);
    return error;
  }
};

// Function to fetch data from Firestore
const fetchData = async (
  collectionName: string,
  queryField: string | null = null,
  queryValue: string | null = null
) => {
  let data;
  let result: any = [];
  let Data;
  data = await getDocs(collection(db, collectionName));
  if (collectionName === 'coach') {
    data?.forEach((coach: any) => {
      if (queryField && queryValue) {
        if (
          coach
            .data()
            .displayName.toLowerCase()
            .includes(queryValue.toLowerCase())
        ) {
          Data = coach.data();
          Data.id = coach.id;
          return result.push(Data);
        }
      }
    });
  }
  if (collectionName === 'club') {
    data?.forEach((club: any) => {
      if (queryField && queryValue) {
        if (club.data().name.toLowerCase().includes(queryValue.toLowerCase())) {
          Data = club.data();
          Data.id = club.id;
          return result.push(Data);
        }
      }
    });
  }
  return result;
};

// Function to find clubs by name
const findByName = async ({ name }: { name: string }) => {
  try {
    if (name.length !== 0) {
      // Fetch clubs by name
      const clubs = await fetchData('club', 'name', name);

      if (clubs.length === 0) {
        return [];
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

      if (coaches.length === 0) {
        return [];
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
    if (coaches?.flat().length === 0) {
      return [];
    }
    return coaches.flat();
  } catch (error: any) {
    return error.message;
  }
};


// This function fetches a player document from the Firestore database by its ID.
const getPlayerById = async (id: string) => {
  // Create a reference to the player document in the Firestore database
  const docRef = doc(db, "player", id);
  // Get the document snapshot
  const docSnap = await getDoc(docRef);
  // Check if the document exists
  if (docSnap.exists()) {
    // Return the data of the document
    return docSnap.data();
  } else {
    // Log a message if the document does not exist
    console.log("No such document!");
    // Return null
    return null;
  }
}

export {
  findByName,
  favouriteCoach,
  findCoachByName,
  unfavoriteCoach,
  favoriteCoachList,
  fetchData,
  getPlayerById,
  locationPosition,
  distanceCalculation,
  filterCoach,
  calculateDistance,
};
