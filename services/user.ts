import { router } from 'expo-router';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Alert } from 'react-native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

async function findUserByEmail(
  email: string,
  displayName: string,
  photoURL: string
) {
  const querySnapshot = await getDocs(
    query(collection(db, 'player'), where('email', '==', email))
  );
  if (querySnapshot.empty) {
    try {
      const newPlayerRef = await addDoc(collection(db, 'player'), {
        email: email,
        displayName: displayName,
        picture: photoURL,
      });
      await ReactNativeAsyncStorage.setItem('userID', newPlayerRef.id)
      console.log('New player added with ID:', newPlayerRef.id);
    } catch (error) {
      console.error('Error adding new player:', error);
    }
    router.push('/user/edit-profile');
    return Alert.alert(
      'Logged in successfully :',
      `Welcome ${displayName}! Please complete your profile.`
    );
  } else {
    querySnapshot.forEach(async (doc) => {
      const playerData = doc.data();
      await ReactNativeAsyncStorage.setItem('userID', doc.id)
      if (!playerData.hasOwnProperty('gender') || !playerData.hasOwnProperty('phoneNumber') || !playerData.hasOwnProperty('birthday') ||
        playerData.gender === '' || playerData.phoneNumber === '' || playerData.birthday === '') {
        router.push('/user/edit-profile');
        return Alert.alert(
          'Logged in successfully :',
          `Welcome ${displayName}! Please complete your profile.`
        );
      } else {
        await ReactNativeAsyncStorage.setItem('userID', doc.id)
        router.push('/user/edit-profile');
        return Alert.alert(
          'Logged in successfully :',
          `Welcome ${displayName}!`
        );
      }
    });
  }
}
async function findConnectedUserByEmail() {
  const email = await ReactNativeAsyncStorage.getItem('email');
  const playerQuery = query(collection(db, 'player'), where('email', '==', email));
  const coachQuery = query(collection(db, 'coach'), where('email', '==', email));
  const [playerQuerySnapshot, coachQuerySnapshot] = await Promise.all([
    getDocs(playerQuery),
    getDocs(coachQuery)
  ]);
  const playerDocument = playerQuerySnapshot.docs.find(doc => doc.exists());
  if (playerDocument) {
    return playerDocument;
  }
  const coachDocument = coachQuerySnapshot.docs.find(doc => doc.exists());
  if (coachDocument) {
    return coachDocument;
  }
  return null;
}
export { findUserByEmail, findConnectedUserByEmail }
