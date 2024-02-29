import Toast from "react-native-toast-message";
/**
 * Function to display a toast message.
 * @param type - The type of toast message ('success' or 'error').
 * @param message - The message to display in the toast.
 * @returns The toast component.
 */
export default function fireToast(type: string, message: string) {
    // Set the text based on the type of message
    const text1 = type === 'success' ? 'Success!' : 'Error!';

    // Show the toast message
    return Toast.show({
        type: type,
        text1: text1,
        text2: message
    });
}