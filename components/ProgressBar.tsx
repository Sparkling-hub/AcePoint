import { StyleSheet } from 'react-native'
import React from 'react'
import { Progress } from 'tamagui';
import Colors from '@/constants/Colors';

const ProgressBar = ({ value }: { value: number }) => {
  return (
    <Progress value={value} style={styles.progress}>
      <Progress.Indicator backgroundColor={Colors.secondary} style={styles.bounce} animation="bouncy" />
    </Progress>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
  progress: {
    backgroundColor: '#DADADA',
    width: "90%"
  },
  bounce: {
    backgroundColor: Colors.secondary,
  },
})