import { Alert, Button } from 'react-native';
import { useAuthIos } from '@/services/auth';
import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase';

export default function GoogleAuthIOS() {
    const { response, promptAsync } = useAuthIos()
    useEffect(() => {
        if (response?.type == "success") {
            try {
                const { id_token } = response.params
                const credential = GoogleAuthProvider.credential(id_token)
                signInWithCredential(firebaseAuth, credential)
                Alert.alert("Success", "You logged in successfully !")
            } catch (error) {
                Alert.alert("Error : ", "Something went wrong !");
                console.log("ERROR : " + error);
            }
        }
    }, [response])
    return (
        <Button
            title="Google Sign-In in apple" onPress={() => {
                promptAsync()
            }}
        ></Button>
    )
}