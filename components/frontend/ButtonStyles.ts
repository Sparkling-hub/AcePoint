import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    input: {
        backgroundColor: "white",
        fontSize: 16,
        height: 45,
        width: 343,
        color: "#3A4D6C",
        borderRadius: 50,

    },
    displayNameText: {
        fontFamily: 'MontserratBold',
        fontSize: 20,
        lineHeight: 24,
        color: Colors.secondary,
        textAlign: 'center',
    },
    title: {
        fontFamily: 'MontserratBold',
        fontSize: 25,
        lineHeight: 25,
        color: Colors.secondary,
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
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