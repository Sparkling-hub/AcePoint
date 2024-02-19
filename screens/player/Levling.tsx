import { SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import {  Heading, RadioGroup, Stack,Text, YStack } from 'tamagui'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RadioGroupItemWithLabel } from '@/components/RadioGroupItemWithLabel';
import Button from '@/components/Button'
import {updateUserPlayer } from'@/api/auth-api'
import {  } from '@tamagui/lucide-icons';
const Levling = ({onNext}:{onNext:() => void}) => {
  const [level, setLevel] = useState('');
  const text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo ex, dapibus sit amet nisi ut, posuere laoreet nulla. Suspendisse dignissim elit in justo efficitur."
  console.log(level)
  const updatePlayer=()=>{
    updateUserPlayer({tennisLevel:level})
    onNext()
  }
  return (
    <SafeAreaView style={styles.container}>
        <Heading size={"$3"} style={styles.header}>Levling</Heading>
       
        <Stack space="$5" style={styles.stack}>
        <View style={styles.box}>
            <Text style={styles.text}>Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. Curabitur leo ex,
            dapibus sit amet nisi ut, posuere laoreet nulla. 
            Suspendisse dignissim elit in justo efficitur.</Text>
        </View>

        </Stack>
        
        <RadioGroup aria-labelledby="Select one item"
        onValueChange={value => setLevel(value)} value={level}
            >
        <YStack width={300} alignItems="center" space="$5">
            <RadioGroupItemWithLabel size="$3" value="Beginner" label="Beginner" />
            {
                level==="Beginner"&& <Text color={"#3A4D6C"} style={styles.showtext}>{text}</Text>
            }
            <RadioGroupItemWithLabel size="$3" value="Intermediate"  label="Intermediate" />
            {
                level==="Intermediate"&& <Text color={"#3A4D6C"} style={styles.showtext}>{text}</Text>
            }
            <RadioGroupItemWithLabel size="$3" value={"Intermediate high"} label="Intermediate high" />
            {
                level==="Intermediate high"&& <Text color={"#3A4D6C"} style={styles.showtext}>{text}</Text>
            }
            <RadioGroupItemWithLabel size="$3" value={"Advanced"} label="Advanced" />
            {
                level==="Advanced"&& <Text  color={"#3A4D6C"} style={styles.showtext}>{text}</Text>
            }
            <RadioGroupItemWithLabel size="$3" value={"Competition"} label="Competition" />
            {
                level==="Competition"&& <Text color={"#3A4D6C"} style={styles.showtext}>{text}</Text>
            }
        </YStack>
        </RadioGroup>
      <Button text={"Continue"} textColor='#fff' onPress={updatePlayer} ></Button>
    </SafeAreaView>
  )
}

export default Levling

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#FFFFFF",
        alignItems: 'center',
      },
      header:{
        paddingTop:hp("4%"),
        fontFamily:"Montserrat",
        fontSize:hp("3%"),
        fontWeight:"700",
        color:"#3A4D6C",
        lineHeight: 21.94,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:60,
    
      },
      box:{
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0, 
        borderColor: '#000', 
        borderRadius: 10,
        padding: 10, 
        height:hp("12%"),
        width:wp("90%"),
        backgroundColor:"#d8dbe2",
      },
      text:{
        color:"#3d5581",
        fontSize:12,
        lineHeight: 14.63,
        fontFamily:"Montserrat",
        fontWeight:"400",
        textAlign: 'left',
        marginLeft:20,

      },
      stack:{
        marginBottom:30
      },
      showtext:{
        fontSize:12,
        lineHeight: 14.63,
        fontFamily:"Montserrat",
        fontWeight:"400",
        textAlign: 'left',
        marginTop:0
      }
})