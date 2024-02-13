import { Platform, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Text, View } from '@/components/Themed';
import 'react-native-gesture-handler';
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
  else if (Platform.OS === 'android') {
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
