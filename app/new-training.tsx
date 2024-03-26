import NewTrainingScreen from "@/screens/coach/NewTraining";
import { SafeAreaView, StyleSheet } from "react-native";

export default function NewTraining() {
    return (
        <SafeAreaView style={styles.container}>
            <NewTrainingScreen />
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