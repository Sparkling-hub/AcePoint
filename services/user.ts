import { router } from "expo-router";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Alert } from "react-native";

export default async function findUserByEmail(email: string, displayName: string, photoURL: string) {
    const querySnapshot = await getDocs(query(collection(db, "player"), where("email", "==", email)));
    if (querySnapshot.empty) {
        try {
            const newPlayerRef = await addDoc(collection(db, "player"), {
                email: email,
                displayName: displayName,
                picture: photoURL
            });
            console.log("New player added with ID:", newPlayerRef.id);
        } catch (error) {
            console.error("Error adding new player:", error);
        }
        return Alert.alert("Logged in successfully :", `Welcome ${displayName}! Please complete your profile.`);
    } else {
        querySnapshot.forEach((doc) => {
            const playerData = doc.data();
            if (!playerData.hasOwnProperty("gender") || !playerData.hasOwnProperty("phoneNumber") || !playerData.hasOwnProperty("birthday")) {
                router.push('/player/edit-profile')
                return Alert.alert("Logged in successfully :", `Welcome ${displayName}! Please complete your profile.`);
            } else {
                return Alert.alert("Logged in successfully :", `Welcome ${displayName}!`);
            }
        })
    }

}