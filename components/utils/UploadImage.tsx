import { Button, Image, StyleSheet } from 'react-native'
import * as ImagePicker from "expo-image-picker";
import { useUploadImage } from '@/hooks/useUploadImage';
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
          < >
          {image && <Image source={{ uri: image }} style={styles.test} />}
          <Button title="Select Image" onPress={pickImage} />
          </>
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
  }
});
export default UploadImage

