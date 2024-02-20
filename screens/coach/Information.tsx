import { SafeAreaView, StyleSheet  } from 'react-native'
import React, { useState } from 'react'
import { Text,Button, ScrollView, Input,YStack  } from 'tamagui'
import { heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {updateUserCoach } from'@/api/auth-api'
import UploadImage from '@/components/utils/UploadImage'
import Colors from '@/constants/Colors'
const Information = ({onNext}:{onNext:() => void}) => {
    const [image,setImage]=useState('')
    const [bios, setBios] = useState<string>('');
    // const [club, setClub] = useState<string>('');
    const [tags, setTags] = useState<string>('');
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
      <ScrollView marginBottom={20}>
        <YStack alignItems="center" gap={"$2"} >
        <YStack marginBottom={25} >
          <YStack alignItems="center" gap={"$4"}>
            <Text
              style={{ fontFamily: 'MontserratBold' }}
              fontSize={20}
              lineHeight={24}
              color={Colors.secondary}>
              Info
            </Text>
          </YStack>
         </YStack>
        <YStack alignItems="center" marginBottom={20} gap={"$4"} >
        <UploadImage getFromChild={setImage} />
         <Text style={styles.datetext}>Upload Picture</Text>
        </YStack>
            
        <YStack alignItems="center" gap={"$2"} >
            <YStack marginBottom={20}  >
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

            <YStack marginBottom={20}  >
            <Text style={styles.text}>Main Club</Text>
            <Input 
            borderWidth={0} 
            borderRadius={9} 
            style={styles.simpleBox} 
            placeholder='Lorem ipsum dolor sit amet'
            // onChangeText={(text) => {
            //     setClub(text); 
            // }}
            />   
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
    </ScrollView>
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