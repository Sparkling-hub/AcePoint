import Colors from '@/constants/Colors';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Image, View } from 'tamagui';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

interface PlayerPfpProps {
  imageContainerStyle?: StyleProp<ViewStyle>;
}

const DEFAULT_SIZE = 94;

export default function PlayerPfp(props: PlayerPfpProps) {
  const { imageContainerStyle } = props;
  const containerStyle = {
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
    ...(imageContainerStyle as object),
  };
  const [image, setImage] = useState('')
  const getImage = async() => {
    const i = await ReactNativeAsyncStorage.getItem('image')
    if(i !== null){
      setImage(i)
    }
  }
  useEffect(() => {
    getImage()
  }, [])

  return (
    <View style={[styles.imageContainer, containerStyle]}>
      {image === '' ? <Image
        source={require('../assets/images/user-pfp.png')}
        style={styles.image}
      />
    :<Image
    src={image}
    style={styles.image}
  />}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: DEFAULT_SIZE / 2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: DEFAULT_SIZE / 2,
  },
});
