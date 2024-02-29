import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useAuthRequest } from "expo-auth-session/build/providers/Google";
import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { findUserByEmail } from "./user";


/**
 * Custom hook for handling Google Sign-In authentication on iOS.
 * @returns An object containing request, response, and promptAsync functions for Google Sign-In.
 */
export const useAuthIos = () => {
    // Use the useAuthRequest hook to handle Google Sign-In authentication on iOS
    const [request, response, promptAsync] = useAuthRequest({
        iosClientId: '739771999940-6pv0f4sfd3jn1rt3ub8methhlevg4p0h.apps.googleusercontent.com'
    });
    return { request, response, promptAsync };
}

/**
 * Function to handle Google Sign-In authentication on Android.
 */
export const authAndroid = async () => {
    // Configure Google Sign-In with the web client ID for Android
    GoogleSignin.configure({
        webClientId: '739771999940-ail5uc7s8j2p84sbddmvojrui3k1c8fl.apps.googleusercontent.com',
    });
    try {
        // Check if Google Play Services are available
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        // Perform Google Sign-In and obtain the ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create Google credentials with the ID token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign in to Firebase with Google credentials
        const { user } = (await auth().signInWithCredential(googleCredential))

        // If user details are available, store them in AsyncStorage and perform further actions
        if (user.displayName && user.email && user.photoURL) {
            await ReactNativeAsyncStorage.setItem('username', user.displayName)
            await ReactNativeAsyncStorage.setItem('email', user.email)
            await ReactNativeAsyncStorage.setItem('image', user.photoURL)
            findUserByEmail(user.email, user.displayName, user.photoURL);
        }
    } catch (error) {
        // Handle errors gracefully
        Alert.alert("Error : ", "Something went wrong !");
    }
}
