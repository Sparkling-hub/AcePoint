import { SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { RadioGroup, ScrollView,Text, YStack } from 'tamagui'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { RadioGroupItemWithLabel } from '@/components/RadioGroupItemWithLabel';
import Button from '@/components/Button'
import {updateUserPlayer } from'@/api/auth-api'
import LevlingBox from '@/components/LevlingBox';
import Colors from '@/constants/Colors';
import ProgressBar from '@/components/ProgressBar';
const Levling = ({onNext}:{onNext:() => void}) => {
  const [level, setLevel] = useState('Beginner');
  const text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo ex, dapibus sit amet nisi ut, posuere laoreet nulla. Suspendisse dignissim elit in justo efficitur."
  const updatePlayer=()=>{
    updateUserPlayer({tennisLevel:level})
    onNext()
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView marginBottom={20}>
        <YStack alignItems="center" >
        <YStack marginBottom={25} >
          <YStack alignItems="center" gap={"$4"}>
            <Text
              style={{ fontFamily: 'MontserratBold' }}
              fontSize={20}
              lineHeight={24}
              color={Colors.secondary}>
              Levling
            </Text>
          </YStack>
         </YStack>
            <ProgressBar value={68} />
         <YStack marginBottom={30} marginTop={30} alignItems="center" >
        <LevlingBox/>
        </YStack>
        <RadioGroup aria-labelledby="Select one item"
        onValueChange={value => setLevel(value)} value={level}
            >
        <YStack width={300} alignItems="center" space="$5">
            <RadioGroupItemWithLabel size="$3" value="Beginner" label="Beginner" level={level} text={text} />
            <RadioGroupItemWithLabel size="$3" value="Intermediate" label="Intermediate" level={level} text={text} />
            <RadioGroupItemWithLabel size="$3" value="Intermediate high" label="Intermediate high" level={level} text={text} />
            <RadioGroupItemWithLabel size="$3" value="Advanced" label="Advanced" level={level} text={text} />
            <RadioGroupItemWithLabel size="$3" value="Competition" label="Competition" level={level} text={text} />
        </YStack>
        </RadioGroup>
        <YStack marginTop={"20%"}>
          <Button text={"Continue"} textColor='#fff' onPress={updatePlayer} ></Button>
      </YStack>
      </YStack>
      </ScrollView>
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
        fontFamily:"MontserratBold",
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