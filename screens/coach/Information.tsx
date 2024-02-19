import { SafeAreaView, StyleSheet  } from 'react-native'
import React from 'react'
import { Avatar, Heading, Stack,View,Text,Button } from 'tamagui'
import { heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen'
const Information = ({onNext}:{onNext:() => void}) => {
    const updatePlayer=()=>{
        onNext()
    }
  return (
    <SafeAreaView style={styles.container}>
    <Heading size={"$3"} style={styles.header}>Info</Heading>
    <Stack space="$4" >
        
        <Avatar circular size="$7" style={styles.avatar}>
            <Avatar.Image onPress={updatePlayer}
            src={require('@/assets/images/avatar.png')}
            />
        </Avatar>
         <Text style={styles.datetext}>Upload Picture</Text>
    </Stack>
    <Stack space="$4" >
    <Stack>
    <Text style={styles.text}>Add Bios</Text>
    <View style={styles.box}>   
        <Text style={styles.input}>Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. Curabitur leo ex,
            dapibus sit amet nisi ut, 
        </Text>
        </View>  
    </Stack>
    <Stack>
    <Text style={styles.text}>Main Club</Text>
    <View style={styles.simpleBox}>   
        <Text style={styles.input}>Lorem ipsum dolor sit amet
        </Text>
    </View>  
    </Stack>
    <Stack>
    <Text style={styles.text}>Add Tags</Text>
    <View style={styles.simpleBox}>   
        <Text style={styles.input}></Text>
    </View> 
    </Stack> 
    
    </Stack>    
    <Stack space="$4" >
    
    </Stack>    
    <Button onPress={updatePlayer} style={styles.button}>Continue</Button> 
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
        marginTop:hp("6%"),
        height:hp("6%"),
        width:wp("55%"),
        left:wp("2%"),
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
        borderWidth: 0, 
        borderColor: '#000', 
        borderRadius: 10,
        padding: 10, 
        height:hp("20%"),
        backgroundColor:"#d8dbe2",
        width:wp("90%"),
    
      },
    simpleBox:{
        borderWidth: 0, 
        borderColor: '#000', 
        borderRadius: 10,
        padding: 10, 
        height:hp("5%"),
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
        fontFamily:"Montserrat",
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
        fontSize:14,
        lineHeight: 17.07,
        fontFamily:"Montserrat",
        fontWeight:"600",
        marginBottom:hp("5%")
    },
})