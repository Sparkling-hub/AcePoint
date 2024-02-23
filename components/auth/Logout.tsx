import { removeItem } from "@/api/localStorage";
import { auth } from "@/lib/firebase";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export async function handleLogout() {
    await ReactNativeAsyncStorage.removeItem('email');
    await ReactNativeAsyncStorage.removeItem('image');
    await ReactNativeAsyncStorage.removeItem('username');
    await ReactNativeAsyncStorage.removeItem('userID');
    await signOut(auth)
    await removeItem('userInfo')
    router.push('/login');
}