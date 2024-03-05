import { Avatar, AvatarProps } from 'tamagui';
import { useEffect, useState } from 'react';
import { findConnectedUserByEmail } from '@/services/user';
const PorfilePicture: React.FC<AvatarProps> = (props) => {
  
  const [image, setImage] = useState('');

  useEffect(() => {
    const getImage = async () => {
      const user = await findConnectedUserByEmail()
      setImage(user?.data().picture)
    };
    getImage();
  }, [])
  return (
    <Avatar {...props}>
      {image ? (
        <Avatar.Image src={image} />
      ) : (
        <Avatar.Image src={require('../../assets/images/user-pfp.png')} />
      )}
      <Avatar.Fallback bc="#EFEFEF" />
    </Avatar>
  );
};

export default PorfilePicture;
