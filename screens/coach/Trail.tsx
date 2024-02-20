import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp,widthPercentageToDP as wp} from 'react-native-responsive-screen'
import { Button, Heading, Image, Stack } from 'tamagui'

const Trail = () => {
    const updatePlayer=()=>{
        console.log("clicked")
    }
  return (
    <SafeAreaView style={styles.container}>
    <Heading size={"$3"} style={styles.header}></Heading>
    <Stack space="$4" >  
        <Stack space="$4" >  
        <Image
        source={require('@/assets/images/acepointicon.png')}
            style={[{ width: 240, height: 55 },styles.image]}
            />
        </Stack>
        <Text style={styles.text}>Try 14 days for free.</Text>
        <Text style={styles.cancel}>Cancel anytime.</Text>
        <Text style={styles.price}>£ 9.99 monthly</Text>
        <View style={styles.box}>   
            <Stack space='$3' >
                <Text style={styles.input}><Image source={require('@/assets/images/check.png')}/> Manage bookings</Text>
                <Text style={styles.input}><Image source={require('@/assets/images/check.png')}/> Advance statistics</Text>
                <Text style={styles.input}><Image source={require('@/assets/images/check.png')}/> Scheduling</Text>
                <Text style={styles.input}><Image source={require('@/assets/images/check.png')}/> Advertise yourself</Text>
                <Text style={styles.input}><Image source={require('@/assets/images/check.png')}/> zero Commissions</Text>
            </Stack>
        </View>

    </Stack>
   
    
    <Text style={styles.textTop}>By continuing you are accepting our terms and conditions</Text>
    <Button onPress={updatePlayer} style={styles.button}>Start 14 days free trial</Button>
</SafeAreaView>
  )
}

export default Trail

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#FFFF",
        alignItems: 'center',
    },
    image: {
        marginLeft:wp("8%"),
        marginBottom:wp("20%"),
     
    },
    button:{
        marginTop:20,
        height:hp("6%"),
        width:wp("55%"),
        left:wp("2%"),
        backgroundColor:"#3A4D6C"
    },
    textTop:{
        marginTop:hp("7%"),
        color:"#3A4D6C",
        fontSize:11,
        lineHeight: 13.41,
        fontFamily:"Montserrat",
        fontWeight:"600",      
        
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
        borderWidth: 1, 
        borderColor: '#A9D05C', 
        borderRadius: 10,
        padding: 10, 
        height:169,
        width:wp("90%"),
    
      },
    text:{
        color:"#A9D05C",
        fontSize:24,
        lineHeight: 29.26,
        fontFamily:"Montserrat",
        fontWeight:"600",          
    },
    cancel:{
        color:"#3A4D6C",
        fontSize:24,
        lineHeight: 29.26,
        fontFamily:"Montserrat",
        fontWeight:"600",          
    },
    price:{
        color:"#3A4D6C",
        fontSize:20,
        lineHeight: 24.38,
        fontFamily:"Montserrat",
        fontWeight:"600", 
        marginTop:wp("8%"),         
    },
    input:{
        color:"#3A4D6C",
        fontSize:14,
        lineHeight: 17.07,
        fontFamily:"Montserrat",
        fontWeight:"600", 
        marginLeft:10
    },
    
    
})