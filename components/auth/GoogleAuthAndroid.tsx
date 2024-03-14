import { authAndroid } from '@/services/auth';
import { Button, Image } from 'tamagui';
import { storeData } from '@/api/localStorage';
import { styles } from '../GoogleStyleButton';
import { setUserRole } from '@/store/slices/userRole';
import { useDispatch } from 'react-redux';
interface GoogleAuthAndroidProps {
  readonly userType: string;
}
export default function GoogleAuthAndroid(props: GoogleAuthAndroidProps) {
  const { userType } = props;
  const dispatch = useDispatch();
  return (
    <Button
      style={styles.ouath}
      onPress={async () => {
        await storeData('userType', userType);
        dispatch(setUserRole(userType));
        await storeData('authMethod', 'google');
        await authAndroid();
      }}>
      <Image
        source={require('@/assets/images/googleIcon.png')}
        style={[{ width: 27.55, height: 28 }]}
      />
    </Button>
  );
}
