import { router } from "expo-router";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Alert } from "react-native";

export default async function findUserByEmail(email: string, displayName: string, photoURL: string) {
    const querySnapshot = await getDocs(query(collection(db, "player"), where("email", "==", email)));
    if (querySnapshot.empty) {
        try {
            await addDoc(collection(db, "player"), {
                email: email,
                displayName: displayName,
                picture: photoURL
            });
        } catch (error) {
            console.log("Error adding new player:", error);
        }
        router.push('/player/edit-profile')
        Alert.alert("Logged in successfully :", `Welcome ${displayName}! Please complete your profile.`);
    } else {
        querySnapshot.forEach((doc) => {
            const playerData = doc.data();
            if (!playerData.hasOwnProperty("gender") || !playerData.hasOwnProperty("phoneNumber") || !playerData.hasOwnProperty("birthday")) {
                router.push('/player/edit-profile')
                Alert.alert("Logged in successfully :", `Welcome ${displayName}! Please complete your profile.`);
            } else {
                return Alert.alert("Logged in successfully :", `Welcome ${displayName}!`);
            }
        })
    }

}