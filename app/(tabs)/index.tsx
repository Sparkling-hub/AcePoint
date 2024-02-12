import { Alert, Button, Platform, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useAuthAndroid, useAuthIos } from '@/hooks/useAuth';
import { Text, View } from '@/components/Themed';
import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase';

WebBrowser.maybeCompleteAuthSession();

export default function TabOneScreen() {
  const { response, request, promptAsync } = useAuthIos()
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
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      {Platform.OS === "android"
        ? <Button
          title="Google Sign-In in android" onPress={() => {
            useAuthAndroid()
          }}
        />
        : <Button
          title="Google Sign-In in apple" onPress={() => {
            promptAsync()
          }}
        />
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
