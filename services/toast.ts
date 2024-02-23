import Toast from "react-native-toast-message";

export default function fireToast(type: string, message: string) {
    const text1 = type == 'success' ? 'Success!' : 'Error!';
    return Toast.show({
        type: type,
        text1: text1,
        text2: message
    });

}