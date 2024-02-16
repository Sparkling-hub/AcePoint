import { Avatar, AvatarProps } from 'tamagui';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const PorfilePicture: React.FC<AvatarProps> = (props) => {
  const [image, setImage] = useState('');
  const getImage = async () => {
    const i = await ReactNativeAsyncStorage.getItem('image');
    if (i !== null) {
      setImage(i);
    }
  };
  // useEffect(() => {
  //   getImage();
  // }, []);

  return (
    <Avatar {...props}>
      {image ? (
        <Avatar.Image src={image} />
      ) : (
        <Avatar.Image src={require('../assets/images/user-pfp.png')} />
      )}
      <Avatar.Fallback bc="#EFEFEF" />
    </Avatar>
  );
};

export default PorfilePicture;
