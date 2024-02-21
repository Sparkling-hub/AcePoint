import { StyleSheet } from 'react-native'
import * as ImagePicker from "expo-image-picker";
import { useUploadImage } from '@/hooks/useUploadImage';
<<<<<<< HEAD
import { Avatar, View } from 'tamagui';
=======
import { Avatar } from 'tamagui';
>>>>>>> 0376c0959368356cd611ab2042ba19a23b3a32fd
import { heightPercentageToDP as hp} from 'react-native-responsive-screen'

const UploadImage = ({getFromChild}: { getFromChild: any  }) => {
    const {uploadImage,image}=useUploadImage()
    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 4],
          quality: 1,
        });
        if (!result.canceled) {
            console.log("test==>",result.assets[0].uri)
            await uploadImage(result.assets[0].uri)
          }
        }
        getFromChild(image)
        return(
          <View marginLeft={-20}>
          {image && <Avatar circular size="$7" style={styles.avatar}>
            <Avatar.Image onPress={pickImage}
            src={image}
            /></Avatar>}
          {!image &&<Avatar circular size="$7" style={styles.avatar}>
            <Avatar.Image onPress={pickImage}
            src={require('@/assets/images/avatar.png')}
            />
        </Avatar>}
          </View>
        );
          
}
const styles = StyleSheet.create({
  sty: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  test:{
     width: 200, height: 200 
  },
  avatar:{
    marginTop:hp("4%"),
    marginLeft:hp("2%")
},
});
export default UploadImage

