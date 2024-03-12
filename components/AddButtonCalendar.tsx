import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "tamagui";

export default function AddButtonCalendar({ testID }: { readonly testID?: string }) {
    const router = useRouter()
    return (
        <TouchableOpacity testID={testID} style={styles.addButton} onPress={() => { router.push("/new-training") }}>
            <Text style={styles.addButtonText}>+</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        paddingBottom: 15
    },
    addButtonText: {
        fontSize: 39,
        color: Colors.secondary,
    },
});

