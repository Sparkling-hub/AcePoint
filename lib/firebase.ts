import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { getReactNativePersistence, signOut, initializeAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { ref, getDownloadURL, uploadBytesResumable, getStorage } from 'firebase/storage'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_API_KEY,FIREBASE_AUTH_DOMAIN,FIREBASE_PROJECT_ID,FIREBASE_MESSAGING_SENDER_ID,FIREBASE_APP_ID,FIREBASE_MEASSUREMENT_ID,FIREBASE_STORAGE_BUCKET } from '@env';


const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASSUREMENT_ID
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
    signOut,updateDoc
    
};