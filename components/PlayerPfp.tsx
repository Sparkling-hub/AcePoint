import Colors from '@/constants/Colors';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Image, View } from 'tamagui';

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

  return (
    <View style={[styles.imageContainer, containerStyle]}>
      <Image
        source={require('../assets/images/user-pfp.png')}
        style={styles.image}
      />
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
