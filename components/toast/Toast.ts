import Toast from "react-native-toast-message";

export default function fireToast({message,type}:{message: string,type: string} ) {
    let backgroundColor = '';
    if (type== 'success') {
        backgroundColor = 'green';
    }else if(type== 'error'){
        backgroundColor = 'red'; 
    }
    return Toast.show({
        type: type,
        text1: message,
        text1Style: {
            color:backgroundColor
        }
    });

}