import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useAuthRequest } from "expo-auth-session/build/providers/Google";
import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import findUserByEmail from "./user";


export const useAuthIos = () => {
    const [request, response, promptAsync] = useAuthRequest({
        iosClientId: '739771999940-6pv0f4sfd3jn1rt3ub8methhlevg4p0h.apps.googleusercontent.com'
    });
    return { request, response, promptAsync };
}

export const authAndroid = async () => {

    GoogleSignin.configure({
        webClientId: '739771999940-ail5uc7s8j2p84sbddmvojrui3k1c8fl.apps.googleusercontent.com',
    });
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const { displayName, email, photoURL } = (await auth().signInWithCredential(googleCredential)).user
        if (displayName && email && photoURL) {
            await ReactNativeAsyncStorage.setItem('username', displayName)
            await ReactNativeAsyncStorage.setItem('email', email)
            await ReactNativeAsyncStorage.setItem('image', photoURL)
            findUserByEmail(email, displayName, photoURL);
        }
    } catch (error) {
        Alert.alert("Error : ", "Something went wrong !");
        console.log("ERROR : " + error);
    }
}