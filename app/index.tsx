import Login from '@/screens/Login'
import { SafeAreaView, StyleSheet } from 'react-native'

export default function login() {

 
    return (
        <SafeAreaView style={styles.container}>
             <Login /> 
            {/* {!isInputFocused && <View style={{marginTop:30}}><HeaderArrow data={"CLUB"}  gap={"$12"} /></View>} */}
            
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',

    }
  })