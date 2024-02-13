import { Alert, Button, Platform, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useAuthIos } from '@/services/auth';
import { Text, View } from '@/components/Themed';
import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { firebaseAuth } from '@/lib/firebase';
import GoogleAuthAndroid from '@/components/GoogleAuthAndroid';
import GoogleAuthIOS from '@/components/GoogleAuthIOS';

WebBrowser.maybeCompleteAuthSession();

export default function TabOneScreen() {
  if (Platform.OS === 'ios') {
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <GoogleAuthIOS></GoogleAuthIOS>
    </View>
  }
  else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tab One</Text>
        <GoogleAuthAndroid></GoogleAuthAndroid>
      </View>
    );
  }
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
