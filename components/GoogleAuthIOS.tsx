import { Alert, StyleSheet } from 'react-native';
import { useAuthIos } from '@/services/auth';
import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { findUserByEmail } from '@/services/user';
import { Button, Image } from 'tamagui';

export default function GoogleAuthIOS() {
  const { response, promptAsync } = useAuthIos();
  const authenticate = async () => {
    if (response?.type == 'success') {
      try {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        const result = await signInWithCredential(auth, credential);
        if (
          result.user.email &&
          result.user.displayName &&
          result.user.photoURL
        ) {
          await ReactNativeAsyncStorage.setItem(
            'username',
            result.user.displayName
          );
          await ReactNativeAsyncStorage.setItem('email', result.user.email);
          await ReactNativeAsyncStorage.setItem('image', result.user.photoURL);
          findUserByEmail(
            result.user.email,
            result.user.displayName,
            result.user.photoURL
          );
        }
      } catch (error) {
        Alert.alert('Error : ', 'Something went wrong !');
      }
    }
  };
  useEffect(() => {
    authenticate();
  }, [response]);
  return (
    <Button
      style={styles.ouath}
      onPress={() => {
        promptAsync();
      }}>
      <Image
        source={require('@/assets/images/googleIcon.png')}
        style={[{ width: 27.55, height: 28 }]}
      />
    </Button>
  );
}

const styles = StyleSheet.create({
  ouath: {
    height: 52,
    width: 95,
    backgroundColor: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19.5,
  },
});
