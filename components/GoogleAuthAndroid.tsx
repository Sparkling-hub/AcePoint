import { authAndroid } from '@/services/auth';
import { StyleSheet } from 'react-native';
import { Button, Image } from 'tamagui';

export default function GoogleAuthAndroid() {
  return (
    <Button
      style={styles.ouath}
      onPress={() => {
        authAndroid();
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
