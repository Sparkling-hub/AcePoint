import Toast from "react-native-toast-message";

export default function fireToast(message: string) {
    return Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: message
    });

}