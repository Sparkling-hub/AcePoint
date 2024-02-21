import Toast from "react-native-toast-message";

export default function fireToast(type: string, message: string) {
    return Toast.show({
        type: type,
        text1: 'Success!',
        text2: message
    });

}