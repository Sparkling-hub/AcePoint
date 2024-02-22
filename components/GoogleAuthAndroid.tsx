import { authAndroid } from '@/services/auth';
import { Button, Image } from 'tamagui';
import { styles } from './GoogleStyleButton';

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

