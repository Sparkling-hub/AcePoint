import React from 'react'
import { StyleSheet} from 'react-native'
import { Button } from 'tamagui'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';



const Botton = ({textColor,text,onPress}:{textColor:string,text:string,onPress?: () => void}) => {
  return (
     <Button color={textColor} style={styles.button} onPress={onPress}>{text}</Button>
  )
}

export default Botton

const styles = StyleSheet.create({
    button:{
        marginTop:hp("10%"),
        height:hp("6%"),
        width:wp("55%"),
        left:wp("3%"),
        backgroundColor:"#3A4D6C"
        
      },
})