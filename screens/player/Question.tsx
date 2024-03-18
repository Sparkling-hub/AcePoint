import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RadioGroup, Text, YStack } from 'tamagui';
import { RadioGroupItemWithLabel } from '@/components/RadioGroupItemWithLabel';
import Button from '@/components/Button';
import DatePicker from '@/components/Form/DatePicker';
import ProgressBar from '@/components/ProgressBar';
import HeaderArrow from '@/components/HeaderArrow';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { signUpData } from '@/store/slices/signup';


const Question = ({handlePrevious,onNext}:{handlePrevious:() => void,onNext:() => void}) => {
  const dispatch=useDispatch()
    const [age, setAge] = useState<string>(() => {
        const date = new Date();
        const dateString = date.toLocaleString();
        const [datePart] = dateString.split(','); 
        const [month, day, year] = datePart.split('/');
        return `${month.trim()}/${day.trim()}/${year.trim()}`;
    })
    const [gender, setGender] = useState('Male');
    const [fitness, setFitness] = useState('Normal');
    useEffect(() => {
      dispatch(signUpData({ age: age, gender: gender, fitness: fitness }))
    }, [age,gender,fitness])
    
    const updatePlayer=async()=>{
      onNext()
      router.push('/')
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <YStack gap={'$5'} alignItems="center">
        <YStack marginBottom={10}>
          <YStack alignItems="flex-start" gap={'$2'} marginLeft={-20}>
            <YStack marginLeft={-25}>
              <HeaderArrow
                back={handlePrevious}
                gap={'$2'}
                data={'ADDITIONAL QUESTIONS'}
              />
            </YStack>
          </YStack>
        </YStack>
        <YStack width={400} marginBottom={20} marginLeft={30}>
          <ProgressBar value={80} />
        </YStack>
        <YStack style={{ width: '85%' }} gap={'$3'}>
          <DatePicker
            date={age}
            handleChange={(text: any) => {
              setAge(text);
            }}
            
          />
        </YStack>
        <YStack gap={'$4'}>
          <Text style={styles.datetext}>Are you male or female?</Text>
          <RadioGroup
            aria-labelledby="Select one item"
            onValueChange={(value) => setGender(value)}
            value={gender}>
            <YStack width={300} alignItems="center" space="$4">
              <RadioGroupItemWithLabel size="$3" value={'Male'} label="Male" id={'Male'} />
              <RadioGroupItemWithLabel
                size="$3"
                value={'Female'}
                label="Female"
                id='Female'
              />
            </YStack>
          </RadioGroup>
        </YStack>
        <YStack gap={'$12'}>
          <YStack gap={'$3'}>
            <Text style={styles.datetext}>What’s your fitness level</Text>
            <RadioGroup
              aria-labelledby="Select one item"
              onValueChange={(value) => setFitness(value)}
              value={fitness}>
              <YStack width={300} alignItems="center" gap={'$3'}>
                <RadioGroupItemWithLabel
                id='Excellent'
                  size="$3"
                  value={'Excellent'}
                  label="Excellent"
                />
                <RadioGroupItemWithLabel
                  size="$3"
                  value={'Good'}
                  label="Good"
                  id='Good'
                />
                <RadioGroupItemWithLabel
                  size="$3"
                  value={'Normal'}
                  label="Normal"
                  id='Normal'
                />
                <RadioGroupItemWithLabel size="$3" value={'Low'} label="Low" id='Low' />
                <RadioGroupItemWithLabel
                  size="$3"
                  value={'Very Low'}
                  label="Very Low"
                  id='Very Low'
                />
              </YStack>
            </RadioGroup>
          </YStack>
          <Button text={'Confirm'} onPress={updatePlayer}></Button>
        </YStack>
      </YStack>
    </SafeAreaView>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
    alignItems: 'center',
  },

  datetext: {
    color: '#3A4D6C',
    fontSize: 14,
    lineHeight: 17.07,
    fontFamily: 'MontserratBold',
    fontWeight: '600',
  },
});
