import NotificationScreen from '@/screens/NotificationScreen'
import { SafeAreaView, StyleSheet } from 'react-native'

export default function notification({ testID }: {
    readonly testID: string;
}) {

    return (
        <SafeAreaView testID={testID} style={styles.container}>
            <NotificationScreen></NotificationScreen>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
})
