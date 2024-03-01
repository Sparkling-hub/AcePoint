import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { getReactNativePersistence, signOut, initializeAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { ref, getDownloadURL, uploadBytesResumable, getStorage } from 'firebase/storage'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASSUREMENT_ID
}

// Initialize Firebase Admin with service account credentials
const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const storage = getStorage(app)

export {
    app, db, auth, storage,
    ref, getDownloadURL, uploadBytesResumable, getFirestore,
    collection, addDoc, doc, setDoc, getDocs, createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut, updateDoc

};