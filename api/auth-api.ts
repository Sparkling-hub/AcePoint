// import { auth } from '@/lib/firebase'
import { signInWithCredential } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const signInWithGoogle = async (access_token: any) => {
    const credential = auth.GoogleAuthProvider.credential(access_token)
    console.log(await auth().signInWithCredential(credential));
}
export { signInWithGoogle };