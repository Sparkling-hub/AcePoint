import auth from '@react-native-firebase/auth';

const signInWithGoogle = async (access_token: any) => {
    const credential = auth.GoogleAuthProvider.credential(access_token)
    console.log(await auth().signInWithCredential(credential));
}
export { signInWithGoogle };