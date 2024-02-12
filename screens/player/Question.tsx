import { SafeAreaView, StyleSheet } from 'react-native'
import React, {useState } from 'react'
import { Heading,RadioGroup,Stack,Text, View, YStack } from 'tamagui'
import { heightPercentageToDP as hp} from 'react-native-responsive-screen'
import DateTimePicker from '@/components/DateTimePicker'
import { RadioGroupItemWithLabel } from '@/components/RadioGroupItemWithLabel'
import Button from '@/components/Button'
import {updateUserPlayer } from'@/api/auth-api'


const Question = () => {
    const [age, setAge] = useState<Date>(new Date());
    const [gender, setGender] = useState('Male');

    const onChange = (selectedDate?: Date) => {
        const currentDate = selectedDate ?? age;
        setAge(currentDate);
    };
    const updatePlayer=()=>{
        updateUserPlayer({age:age,
            gender:gender
        })
      }
  return (
    <SafeAreaView style={styles.container}>
        <Heading size={"$3"} style={styles.header}>Answer the questions</Heading>
        <Stack space="$4" >
        <Text style={styles.text}>This questions will determin your AcePoint level</Text>
        <Text style={styles.datetext}>Date of birth</Text>
        <View theme={"light"}>
        <DateTimePicker onConfirm={onChange} date={age} confirmText='yes' type="date"  />
        </View>  
        <Stack space="$4" >
        <Text style={styles.datetext}>Are you male or female?</Text>
        <RadioGroup aria-labelledby="Select one item"
            onValueChange={value => setGender(value)} value={gender}>
            <YStack width={300} alignItems="center" space="$4">
                <RadioGroupItemWithLabel size="$3" value={"Male"} label="Male" />
                <RadioGroupItemWithLabel size="$3" value={"Female"} label="Female" />
            </YStack>
        </RadioGroup>
        </Stack>    
        </Stack>
        <Button text={"Confirm"} textColor='#fff' onPress={updatePlayer}></Button>
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
        fontFamily:"Montserrat",
        fontWeight:"600",
    },
})