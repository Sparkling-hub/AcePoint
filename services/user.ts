import { router } from 'expo-router';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Alert } from 'react-native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { retrieveData } from '@/api/localStorage';
import fireToast from './toast';
import { handleLogout } from '@/components/auth/Logout';
/**
 * Asynchronously finds a user by email in Firestore and performs necessary actions based on user type and profile completeness.
 * @param email - The email of the user to find.
 * @param displayName - The display name of the user.
 * @param photoURL - The URL of the user's profile photo.
 */
async function findUserByEmail(
  email: string,
  displayName: string,
  photoURL: string
) {
  // Retrieve the user type from AsyncStorage
  const userType = await retrieveData('userType');

  // Initialize the querySnapshot variable
  let querySnapshot = null;

  // Determine the collection to query based on the user type
  if (userType === 'Player') {
    querySnapshot = await getDocs(
      query(collection(db, 'player'), where('email', '==', email))
    );
  } else {
    querySnapshot = await getDocs(
      query(collection(db, 'coach'), where('email', '==', email))
    );
  }

  // Check if the query result is empty
  if (querySnapshot.empty) {
    try {
      // Add a new user document to Firestore based on the user type
      if (userType === 'Player') {
        const newPlayerRef = await addDoc(collection(db, 'player'), {
          email: email,
          displayName: displayName,
          image: photoURL,
          sessionNotification: true,
          messageNotification: true,
          promotionsViaEmail: true,
          feedbackNotification: true
        });
        // Store the user ID in AsyncStorage
        await ReactNativeAsyncStorage.setItem('userID', newPlayerRef.id);
        console.log('New player added with ID:', newPlayerRef.id);
      } else if (userType === 'Coach') {
        const newCoachRef = await addDoc(collection(db, 'coach'), {
          email: email,
          displayName: displayName,
          image: photoURL,
          sessionNotification: true,
          messageNotification: true,
          promotionsViaEmail: true,
          feedbackNotification: true
        });
        // Store the user ID in AsyncStorage
        await ReactNativeAsyncStorage.setItem('userID', newCoachRef.id);
        console.log('New coach added with ID:', newCoachRef.id);
      }
    } catch (error) {
      console.error('Error adding new user:', error);
    }
    // Redirect the user to the edit profile page and display a success message
    router.replace('/user/edit-profile');
    return Alert.alert(
      'Logged in successfully:',
      `Welcome ${displayName}! Please complete your profile.`
    );
  } else {
    // Iterate through the query result to check profile completeness
    querySnapshot.forEach(async (doc) => {
      const userData = doc.data();
      // Store the user ID in AsyncStorage
      await ReactNativeAsyncStorage.setItem('userID', doc.id);
      if (
        !userData.hasOwnProperty('gender') ||
        !userData.hasOwnProperty('phoneNumber') ||
        !userData.hasOwnProperty('birthday') ||
        userData.gender === '' ||
        userData.phoneNumber === '' ||
        userData.birthday === ''
      ) {
        // Redirect the user to the edit profile page if the profile is incomplete
        router.replace('/user/edit-profile');
        return Alert.alert(
          'Logged in successfully:',
          `Welcome ${displayName}! Please complete your profile.`
        );
      } else {
        // Store the user ID in AsyncStorage and redirect the user to the appropriate page
        router.replace('/(tabs)');
        return Alert.alert('Logged in successfully:', `Welcome ${displayName}!`);
      }
    });
  }
}

/**
 * Asynchronously finds a user by email in Firestore and returns the document if found, or null if not found.
 * @returns A Promise that resolves to the Firestore document of the user, or null if not found.
 */
async function findConnectedUserByEmail() {
  // Retrieve the user email from AsyncStorage
  const email = await ReactNativeAsyncStorage.getItem('email');

  // Query the player and coach collections in parallel
  const playerQuery = query(collection(db, 'player'), where('email', '==', email));
  const coachQuery = query(collection(db, 'coach'), where('email', '==', email));
  const [playerQuerySnapshot, coachQuerySnapshot] = await Promise.all([
    getDocs(playerQuery),
    getDocs(coachQuery)
  ]);

  // Find the user document in the player collection
  const playerDocument = playerQuerySnapshot.docs.find(doc => doc.exists());
  if (playerDocument) {
    return playerDocument; // Return the player document if found
  }

  // Find the user document in the coach collection
  const coachDocument = coachQuerySnapshot.docs.find(doc => doc.exists());
  if (coachDocument) {
    return coachDocument; // Return the coach document if found
  }

  return null; // Return null if the user is not found in either collection
}

async function handleDeleteAccount(userRoleValue: string) {
  let user = null
  user = auth.currentUser;
  if (user) {
    try {
      await user.delete()
      fireToast('success', 'Your account has been successfully deleted!')
      await handleLogout()
    } catch (error) {
      fireToast('error', 'Something went wrong!')
      console.error("Error removing document:", error);
    }
  }
  else {
    const userId = await ReactNativeAsyncStorage.getItem('userID');
    let userDocRef = doc(db, 'coach', userId);
    if (userRoleValue === 'Player') userDocRef = doc(db, 'player', userId);
    try {
      await deleteDoc(userDocRef);
      fireToast('success', 'Your account has been successfully deleted!')
      await handleLogout()
    } catch (error) {
      fireToast('error', 'Something went wrong!')
      console.error("Error removing document:", error);
    }
  }
}

export { findUserByEmail, findConnectedUserByEmail, handleDeleteAccount }
