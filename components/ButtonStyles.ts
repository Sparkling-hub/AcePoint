import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    displayNameText: {
        fontFamily: 'MontserratBold',
        fontSize: 20,
        lineHeight: 24,
        color: Colors.secondary,
        textAlign: 'center',
    },
    text: {
        fontFamily: 'MontserratBold',
        fontSize: 16,
        lineHeight: 20,
        color: Colors.secondary,
        paddingLeft: 20,
        marginBottom: 10,
    },
    button: {
        backgroundColor: Colors.primary,
        height: 52,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 8,
        padding: 16,
        paddingHorizontal: 20,
    },
    dangerbutton: {
        backgroundColor: Colors.danger,
        height: 52,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 8,
        padding: 16,
        paddingHorizontal: 20,
    },
    buttonText: {
        fontFamily: 'MontserratMedium',
        fontSize: 16,
        lineHeight: 20,
        color: Colors.secondary,
    },
});