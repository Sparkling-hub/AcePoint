import { authAndroid } from '@/services/auth';
import { Button, Image } from 'tamagui';
import { styles } from './GoogleStyleButton';
import { storeData } from '@/api/localStorage';
interface GoogleAuthAndroidProps{
  readonly userType:string
}
 export default function GoogleAuthAndroid(props : GoogleAuthAndroidProps) {
  const { userType } = props;
  return (
    <Button
      style={styles.ouath}
      onPress={async () => {
        await storeData("userType",userType)
        await authAndroid();
      }}>
      <Image
        source={require('@/assets/images/googleIcon.png')}
        style={[{ width: 27.55, height: 28 }]}
      />
    </Button>
  );
}

