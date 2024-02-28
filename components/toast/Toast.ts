import Toast from "react-native-toast-message";

export default function fireToast({message,type}:{message: string,type: string} ) {
    let text1=''
    let backgroundColor = '';
    if (type== 'success') {
        text1=message 
        backgroundColor = 'green';
    }else if(type== 'error'){
        text1=message 
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