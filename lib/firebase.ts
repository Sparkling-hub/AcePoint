import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { getReactNativePersistence, signOut, initializeAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { ref, getDownloadURL, uploadBytesResumable, getStorage } from 'firebase/storage'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyCGuHH-y3rBoWAO62Fov0nBWARVaRpG8Nw",
    authDomain: "acepoint-9cd79.firebaseapp.com",
    projectId: "acepoint-9cd79",
    storageBucket: "acepoint-9cd79.appspot.com",
    messagingSenderId: "739771999940",
    appId: "1:739771999940:web:aa001b5d5c4dcd96fd8b91",
    measurementId: "G-2MCQY7XRP6"
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
    signOut, updateDoc,
};
