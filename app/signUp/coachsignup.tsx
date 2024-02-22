import SignUpCoach from '@/screens/signUpCoach'
import { SafeAreaView, StyleSheet } from 'react-native'

export default function coachsignup() {
   
 
    return (
        <SafeAreaView style={styles.container}>
            <SignUpCoach />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,

    }
  })