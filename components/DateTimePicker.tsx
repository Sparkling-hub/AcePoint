import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker"; // https://github.com/mmazzarolo/react-native-modal-datetime-picker
import { XStack, Input, } from 'tamagui'
import { Calendar, Clock } from '@tamagui/lucide-icons'

interface DatePickerProps {
    date?: Date;
    type: "date" | "time";
    confirmText?: string
    cancelText?: string;
    accentColor?: string;
    textColor?: string;
    buttonTextColorIOS?: string;
    onChange?: (date: Date) => void;
    onConfirm?: (date: Date) => void;
}

const DateTimePicker = function DatePicker(props: DatePickerProps) {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(props.date);

    useEffect(() => {
        setDate(props.date);
    }, [props.date]);

    const hideDatePicker = () => {
        setShow(false);
    };

    const handleConfirm = (date: Date) => {
        setDate(date);
        props.onConfirm && props.onConfirm(date);
        hideDatePicker();
    };

    const type = props.type || 'date';


    return (

            <Pressable  onPress={() => setShow(true)} >
                <XStack alignItems={'center'}  justifyContent='flex-end' >
                    <Input pointerEvents="none" editable={false} flexGrow={1} style={{height:72,color:"#3A4D6C"}}  >
                        {

                            type === 'date' && date?.toLocaleDateString()
                        }

                        {
                            type === 'time' && date?.toLocaleTimeString()
                        }
                    </Input>

                    <XStack paddingRight={10} position='absolute'>
                        
                        {
                            type === 'date' && <Calendar style={{color:"#3A4D6C"}}/>
                        }

                        {
                            type === 'time' && <Clock />
                        }
                    </XStack>
                </XStack>

                <DateTimePickerModal 
                cancelTextIOS={props.cancelText}
                confirmTextIOS={props.confirmText}
                date={date}
                isVisible={show}
                mode={type}
                accentColor={props.accentColor}
                textColor={props.textColor}
                buttonTextColorIOS={props.buttonTextColorIOS}
                onChange={props.onChange}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
             
            />

            </Pressable>



  

    )
}

export default DateTimePicker;