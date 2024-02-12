import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useAuthRequest } from "expo-auth-session/build/providers/Google";
import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";

export const useAuthWeb = () => {
    const [request, response, promptAsync] = useAuthRequest({
        clientId: '739771999940-ail5uc7s8j2p84sbddmvojrui3k1c8fl.apps.googleusercontent.com',
        redirectUri: 'http://localhost:8081',
        scopes: ['profile', 'email'],
    });
    return { request, response, promptAsync };
}

export const useAuthAndroid = async () => {
    GoogleSignin.configure({
        webClientId: '739771999940-ail5uc7s8j2p84sbddmvojrui3k1c8fl.apps.googleusercontent.com',
    });
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken, user } = await GoogleSignin.signIn();
        Alert.alert("Logged in successfully :", `Welcome back ${user.name}`);
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
    } catch (error) {
        Alert.alert("Error: ",  "Something went wrong")
    }
}