import CalendarCoachScreen from "@/screens/coach/CalendarCoachScreen";
import { SafeAreaView, StyleSheet } from "react-native";

export default function CalendarCoach() {
    return (
        <SafeAreaView style={styles.container}>
            <CalendarCoachScreen />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    }
})