import { useEffect, useState } from 'react';
import { Button, Platform, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useAuthAndroid, useAuthWeb } from '@/hooks/useAuth';
import { Text, View } from '@/components/Themed';


WebBrowser.maybeCompleteAuthSession();

export default function TabOneScreen() {


  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  // const auth = useAuth()
  // const fetchUserInfo = async () => {
  //   let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`
  //     }
  //   })
  //   setUserInfo(await response.json())
  // }
  // useEffect(() => {
  //   if (auth.response?.type == "success" && auth.response.authentication) {
  //     setAccessToken(auth.response.authentication.accessToken)
  //     console.log(auth.response);
  //     accessToken && fetchUserInfo()
  //     // signInWithGoogle(accessToken)
  //     // const { access_token } = auth.response.params
  //     // signInWithGoogle(access_token);
  //   }
  // }, [auth.response, accessToken]);

  const onGoogleButtonPress = async () => {
    if (Platform.OS === "android") {
      useAuthAndroid()
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      {userInfo && <>{userInfo.name}</>}
      <Button
        title="Google Sign-In" onPress={() => {
          onGoogleButtonPress()
        }}
      />
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
