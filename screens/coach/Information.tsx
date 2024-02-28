import { Modal, SafeAreaView, StyleSheet, TouchableOpacity  } from 'react-native'
import React, { useState } from 'react'
import { Text,Button, Input,YStack  } from 'tamagui'
import { heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {updateUserCoach } from'@/api/auth-api'
import UploadImage from '@/components/utils/UploadImage'
import HeaderArrow from '@/components/HeaderArrow'
import SearchApi from '@/components/SearchApi/SearchApi'
import ProgressBar from '@/components/ProgressBar'
const Information = ({onNext,handlePrevious}:{onNext:() => void,handlePrevious:() => void}) => {
    const [image,setImage]=useState('')
    const [bios, setBios] = useState<string>('');
    const [tags, setTags] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [close, setClose] = useState<boolean>(false);
    const [receivedData, setReceivedData] = useState<string>('');
    const handleData = (data:string) => {
        setReceivedData(data);
      };
    const updateCoach=()=>{
        updateUserCoach({image:image,
            bios:bios,
            tags:tags
        })
         onNext()
        console.log("updated")
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
        <UploadImage getFromChild={setImage} />
         <Text style={styles.datetext}>Upload Picture</Text>
        </YStack>
            
        <YStack alignItems="center" gap={"$0.5"} >
            <YStack marginBottom={15}  >
            <Text style={styles.text}>Add Bios</Text>
            <Input borderWidth={0} 
            borderRadius={9} 
            style={styles.box} 
            placeholder='Lorem ipsum dolor sit amet,consectetur adipiscing elit. Curabitur leo ex'
            onChangeText={(text) => {
                setBios(text); 
            }}
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
            <Text style={styles.text}>Add Tags</Text>
            <Input 
            borderWidth={0} 
            borderRadius={9} 
            style={styles.simpleBox} 
            placeholder=''
            onChangeText={(text) => {
                setTags(text); 
            }}
            />   
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
        backgroundColor:"#d8dbe2",
        width:wp("90%"),
        color:"#3A4D6C",
        fontSize:14,
        lineHeight: 17.07,
        fontFamily:"MontserratMedium",
        fontWeight:"500",
    
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
})