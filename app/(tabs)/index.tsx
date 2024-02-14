import { Platform, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Text, View } from '@/components/Themed';
import 'react-native-gesture-handler';
import GoogleAuthAndroid from '@/components/GoogleAuthAndroid';
import GoogleAuthIOS from '@/components/GoogleAuthIOS';
import { Button } from 'tamagui';
import EditScreenInfo from '@/components/EditScreenInfo';

WebBrowser.maybeCompleteAuthSession();

export default function TabOneScreen() {
  const GoogleAuth = () => {
    if (Platform.OS === 'ios') {
      return (
        <GoogleAuthIOS></GoogleAuthIOS>
      )
    }
    else if (Platform.OS === 'android') {
      return (
        <GoogleAuthAndroid></GoogleAuthAndroid>
      );
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text style={{ marginBottom: 10 }}>Hello Tamagui!</Text>
      <Button size="$3" onPress={() => alert('Button pressed!')}>
        Press Me
      </Button>
      {GoogleAuth()}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
