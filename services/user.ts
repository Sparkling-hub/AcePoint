import { router } from 'expo-router';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Alert } from 'react-native';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export default async function findUserByEmail(
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
      if (
        !(playerData.hasOwnProperty('gender') && playerData.gender === '') ||
        !(playerData.hasOwnProperty('phoneNumber') && playerData.phoneNumber === '') ||
        !(playerData.hasOwnProperty('birthday') && playerData.birthday === '')
      ) {
        await ReactNativeAsyncStorage.setItem('userID', doc.id)
        router.push('/user/edit-profile');
        return Alert.alert(
          'Logged in successfully :',
          `Welcome ${displayName}! Please complete your profile.`
        );
      } else {
        await ReactNativeAsyncStorage.setItem('userID', doc.id)
        return Alert.alert(
          'Logged in successfully :',
          `Welcome ${displayName}!`
        );
      }
    });
  }
}
