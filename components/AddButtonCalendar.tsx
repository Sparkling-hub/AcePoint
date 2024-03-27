import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "tamagui";

export default function AddButtonCalendar({ testID, selectedDate }: { readonly testID?: string, readonly selectedDate: string }) {
    const paddingTop = Platform.OS === 'ios' ? 5 : 0
    const router = useRouter()
    return (
        <TouchableOpacity testID={testID} style={styles.addButton} onPress={() => {
            router.push({
                pathname: "/new-training",
                params: { selectedDate: selectedDate },
            })
        }}>
            <Text style={{ ...styles.addButtonText, paddingTop: paddingTop }}>+</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 40,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.primary,
        zIndex: 10,
    },
    addButtonText: {
        fontSize: 39,
        color: Colors.secondary,
        textAlign: 'center'
    },
});

