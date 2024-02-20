import { SafeAreaView, StyleSheet } from 'react-native'
import React, {useState } from 'react'
import { RadioGroup,Text, YStack } from 'tamagui'
import { heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { RadioGroupItemWithLabel } from '@/components/RadioGroupItemWithLabel'
import Button from '@/components/Button'
import {updateUserPlayer } from'@/api/auth-api'
import Colors from '@/constants/Colors'
import DatePicker from '@/components/Form/DatePicker'
import ProgressBar from '@/components/ProgressBar'


const Question = () => {
    const [age, setAge] = useState<string>(() => {
        const date = new Date();
        const dateString = date.toLocaleString();
        const [datePart] = dateString.split(','); 
        const [month, day, year] = datePart.split('/');
        return `${month.trim()}/${day.trim()}/${year.trim()}`;
    })
    const [gender, setGender] = useState('Male');
    const [fitness, setFitness] = useState('Normal');
    const updatePlayer=()=>{
         updateUserPlayer({age:age,
             gender:gender,
             fitness:fitness
         })
    }
  return (
    <SafeAreaView style={styles.container}>
        <YStack gap={'$5'}>
        <YStack marginBottom={30}>
        <YStack alignItems="center" gap={'$4'}>
            <Text
              style={{ fontFamily: 'MontserratBold' }}
              fontSize={20}
              lineHeight={24}
              color={Colors.secondary}>
              ADDITIONAL QUESTIONS
            </Text>
            <ProgressBar value={85} />
          </YStack>
          </YStack>
        <YStack style={{width:"85%"}} gap={'$3'}>
        <DatePicker 
              date={age}
              handleChange={(text:any) => {
                setAge(text); 
              }}
              validateOnInit
            />
        </YStack>
        <YStack gap={'$4'}>
        <Text style={styles.datetext}>Are you male or female?</Text>
        <RadioGroup aria-labelledby="Select one item"
            onValueChange={value => setGender(value)} value={gender}>
            <YStack width={300} alignItems="center" space="$4">
                <RadioGroupItemWithLabel size="$3" value={"Male"} label="Male" />
                <RadioGroupItemWithLabel size="$3" value={"Female"} label="Female" />
            </YStack>
        </RadioGroup>
        </YStack>
        <YStack gap={'$12'}>
        <YStack gap={'$3'}>
        <Text style={styles.datetext}>What’s your fitness level</Text>
        <RadioGroup aria-labelledby="Select one item"
            onValueChange={value => setFitness(value)} value={fitness}>
            <YStack width={300} alignItems="center" gap={'$3'}>
                <RadioGroupItemWithLabel size="$3" value={"Excellent"} label="Excellent" />
                <RadioGroupItemWithLabel size="$3" value={"Good"} label="Good" />
                <RadioGroupItemWithLabel size="$3" value={"Normal"} label="Normal" />
                <RadioGroupItemWithLabel size="$3" value={"Low"} label="Low" />
                <RadioGroupItemWithLabel size="$3" value={"Very low"} label="Very low" />
            </YStack>
        </RadioGroup>
        </YStack>
        <Button text={"Confirm"} onPress={updatePlayer}></Button>
        </YStack>
        </YStack>
    </SafeAreaView>
  )
}

export default Question

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#FFFF",
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
        marginBottom:20,
    },
    text:{
        color:"#3A4D6C",
        fontSize:14,
        lineHeight: 17.07,
        fontFamily:"Montserrat",
        fontWeight:"400",
        alignItems:"center",
        justifyContent:"center",
        marginBottom:20
    },
    datetext:{
        color:"#3A4D6C",
        fontSize:14,
        lineHeight: 17.07,
        fontFamily:"MontserratBold",
        fontWeight:"600",
    },
})