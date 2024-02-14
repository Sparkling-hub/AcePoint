import { Alert, Button } from 'react-native';
import { useAuthIos } from '@/services/auth';
import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export default function GoogleAuthIOS() {
    const { response, promptAsync } = useAuthIos()
    const authenticate = async () => {
        if (response?.type == "success") {
            try {
                const { id_token } = response.params
                const credential = GoogleAuthProvider.credential(id_token)
                const result = await signInWithCredential(auth, credential)
                if (result.user.email && result.user.displayName && result.user.photoURL) {
                    await ReactNativeAsyncStorage.setItem('username', result.user.displayName)
                    await ReactNativeAsyncStorage.setItem('email', result.user.email)
                    await ReactNativeAsyncStorage.setItem('image', result.user.photoURL)
                }
                Alert.alert("Success", "You logged in successfully !")
            } catch (error) {
                Alert.alert("Error : ", "Something went wrong !");
                console.log("ERROR : " + error);
            }
        }
    }
    useEffect(() => {
        authenticate()
    }, [response])
    return (
        <Button
            title="Google Sign-In in apple" onPress={() => {
                promptAsync()
            }}
        ></Button>
    )
}