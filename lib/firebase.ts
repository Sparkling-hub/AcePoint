import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
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

export { app, db, getFirestore, collection, addDoc, getDocs, auth };