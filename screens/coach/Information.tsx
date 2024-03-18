import { Modal, SafeAreaView, StyleSheet, TouchableOpacity  } from 'react-native'
import React, { useState } from 'react'
import { Text,Button, Input,YStack, View  } from 'tamagui'
import { heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen'
import UploadImage from '@/components/utils/UploadImage'
import HeaderArrow from '@/components/HeaderArrow'
import SearchApi from '@/components/SearchApi/SearchApi'
import ProgressBar from '@/components/ProgressBar'
import * as Yup from 'yup';
import fireToast from '@/components/toast/Toast'
import { useDispatch } from 'react-redux'
import { signUpData } from '@/store/slices/signup'
import DropDownPicker from 'react-native-dropdown-picker';

const Information = ({onNext,handlePrevious}:{onNext:() => void,handlePrevious:() => void}) => {
    const dispatch=useDispatch()

    const [image,setImage]=useState('')
    const [bios, setBios] = useState<string>('');
    const [on, setOn] = useState(false);
    const [tags, setTags] = useState([]);
    const [items, setItems] = useState([
        { label: 'Fun', value: 'Fun' },
        { label: 'Beginner', value: 'Beginner' },
        { label: 'Competitive', value: 'Competitive' },
    ]);    const [open, setOpen] = useState<boolean>(false);
    const [close, setClose] = useState<boolean>(false);
    const [receivedData, setReceivedData] = useState<string>('');
    const [errors, setErrors] = useState({
        image:undefined,
        bios:undefined,
        tags:undefined,
    }); // State to hold validation errors
    const validate = async () => {
        try {
          await Yup.object().shape({
            image: Yup.string().required('Image is required'),
            bios: Yup.string().required('bios is required').min(10, 'too short bio'),
            tags: Yup.array().required('tags is required'),
          }).validate({
            image,
            bios,
            tags,
          }, { abortEarly: false });
          setErrors({
            image:undefined,
            bios:undefined,
            tags:undefined,
          }); // Reset errors if validation succeeds
          return true;
        } catch (error:any) {
          const validationErrors = error.inner.reduce((errors:any, currentError:any) => {
         fireToast({ message: currentError.message, type: "error" }); // Assuming fireToast is a function to display errors
            return {
              ...errors,
              [currentError.path]: currentError.message
            };
          }, {});
          setErrors(validationErrors); // Set errors if validation fails
          return false;
        }
    }
    const handleData = (data:string) => {
        setReceivedData(data);
      };
    const updateCoach=async ()=>{
        const isValid = await validate();
        if (isValid){
          dispatch(signUpData({image:image,bios:bios,tags:tags}))
           onNext()          
        }
    } 
    const handleChange=(text:string) =>{
        setTimeout(() => setImage(text), 0);
    }
  return (
    <SafeAreaView style={styles.container}>
        <YStack alignItems="center" gap={"$2"} >
        <YStack marginBottom={25} >
          <YStack alignItems="flex-start" gap={"$4"} marginLeft={-150}>
          <HeaderArrow back={handlePrevious} gap={"$11"} data={"INFO"} />
          </YStack>
          
         </YStack>
         <YStack width={400} marginBottom={20} marginLeft={30} >
          <ProgressBar value={68}/>
          </YStack>
        <YStack alignItems="center" marginBottom={20} marginTop={-25} gap={"$4"} >
        <UploadImage getFromChild={handleChange} />
         <Text style={styles.datetext}>Upload Picture</Text>
        </YStack>
            
        <YStack alignItems="center" gap={"$0.5"} >
            <YStack marginBottom={15}  >
            <Text style={styles.text}>Add Bios{errors.bios && <Text color={'red'}> *</Text>}</Text>
            <Input borderWidth={0} 
            borderRadius={9} 
            style={styles.box} 
            placeholder='Lorem ipsum dolor sit amet,consectetur adipiscing elit. Curabitur leo ex'
            onChangeText={(text) => {setBios(text)}}
            />   
            </YStack>

            <YStack marginBottom={15}  >
            <Text style={styles.text}>Main Club</Text>
            <TouchableOpacity onPress={()=>setOpen(true)}>
            <Input 
            borderWidth={0} 
            borderRadius={9} 
            style={styles.simpleBox} 
            readOnly
            value={close ? receivedData:''}
            />    
            </TouchableOpacity>
            <Modal 
            animationType="slide"
            visible={open}
            >
                 <SearchApi setOpen={setOpen} setClose={setClose} handleData={handleData} /> 
            </Modal>
            </YStack>    
            <YStack>
            <Text style={styles.text}>Add Tags{errors.tags && <Text color={'red'}> *</Text>}</Text>
            <View style={{justifyContent: 'center',alignContent: 'center' }}>
              
             <DropDownPicker
                placeholder=''
                open={on}
                value={tags}
                items={items}
                setOpen={setOn}
                setValue={setTags}
                setItems={setItems}
                style={[styles.simpleBox, { borderWidth: 0, borderRadius: 9,justifyContent: 'center',alignContent: 'center' }]}
                textStyle={styles.simpleBox}
                iconContainerStyle={{backgroundColor:"#3A4D6C"}}
                labelStyle={{ marginTop: 2 ,backgroundColor:"#d8dbe2", height:20 }}
                dropDownContainerStyle={{backgroundColor:"#d8dbe2"}}
                listItemContainerStyle={{justifyContent: 'space-around', marginTop: 15,alignContent: 'space-around' , height: 45}}
                showTickIcon={false}
                multiple={true}
                min={0}
                max={3}
            />    
        </View>   
        </YStack> 
    
    </YStack>    
    <Button onPress={updateCoach} style={styles.button}>Continue</Button> 
    </YStack>
</SafeAreaView>
  )
}

export default Information

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#FFFF",
        alignItems: 'center',
    },
    button:{
        marginTop:80,
        height:52,
        width:136,
        color:"#ffff",
        backgroundColor:"#3A4D6C"
    },
    header:{
        paddingTop:hp("4%"),
        fontFamily:"Montserrat",
        fontSize:hp("3%"),
        fontWeight:"700",
        color:"#3A4D6C",
        lineHeight: 21.94,
        marginBottom:20,
    },
    box:{
        textAlign: 'auto',
        textAlignVertical:"top",
        paddingVertical: 20 ,
        height:137,
        backgroundColor:"#d8dbe2",
        width:wp("90%"),
    
      },
    simpleBox:{
        height:43,
        width:wp("90%"),
        backgroundColor:"#d8dbe2",
        color:"#3A4D6C",
        fontSize:14,
        lineHeight: 17.07,
        fontFamily:"MontserratMedium",
        fontWeight:"500",
        justifyContent:'center',
        alignItems:'center'
    
      },
    avatar:{
        marginTop:hp("4%"),
        marginLeft:hp("2%")
    },
    text:{
        color:"#3A4D6C",
        fontSize:14,
        lineHeight: 17.07,
        fontFamily:"MontserratMedium",
        fontWeight:"400",
        marginLeft:20, 
        marginBottom:10 
          
    },
    input:{
        color:"#3A4D6C",
        fontSize:14,
        lineHeight: 17.07,
        fontFamily:"Montserrat",
        fontWeight:"400",
    },
    datetext:{
        color:"#3A4D6C",
        fontSize:20,
        lineHeight: 24.38,
        fontFamily:"MontserratMedium",
        fontWeight:"400",
    },
    dropdown: {
        width: 200,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
})