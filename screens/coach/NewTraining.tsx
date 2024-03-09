import CustomInput from "@/components/Form/CustomInput";
import Alarm from "@/components/svg/Alarm";
import Badge from "@/components/svg/Badge";
import Person from "@/components/svg/Person";
import Sutitles from "@/components/svg/Subtitles";
import Tennis from "@/components/svg/Tennis";
import Colors from "@/constants/Colors";
import Portrait from "@/components/svg/Portrait";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { CalendarDays } from "@tamagui/lucide-icons";
import { ScrollView, YStack } from "tamagui";
import Recurrence from "@/components/svg/Recurrence";
import StyleIcon from "@/components/svg/StyleIcon";
import Payment from "@/components/svg/Payment";
import TimeIcon from "@/components/svg/TimeIcon";
import CustomButton from "@/components/CustomButton";
import { useState } from "react";

export default function NewTrainingScreen() {
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    };

    const handleConfirm = (date: Date) => {
        console.log(date.toLocaleDateString());
        handleShow();
    };
    return (
        <ScrollView height={'100%'}>
            <YStack flex={1} paddingTop={35} paddingRight={20} paddingLeft={20}>
                <YStack marginBottom={20}>
                    <CustomInput
                        placeholder="Organiser"
                        icon={<Badge />}
                    />
                </YStack>
                <YStack marginBottom={20}>
                    <CustomInput
                        placeholder="Description"
                        icon={<Sutitles />}
                    />
                </YStack>
                <YStack gap={10} width={'100%'} marginBottom={20} display="flex" flexDirection="row">
                    <CustomInput
                        width={'49%'}
                        placeholder="Date"
                        readOnly
                        onPress={handleShow}
                        icon={<CalendarDays color={Colors.secondary} />}
                    />
                    <DateTimePickerModal
                        isVisible={show}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={handleShow}
                    />
                    <CustomInput
                        width={'48%'}
                        keyboardType="numeric"
                        placeholder="Duration"
                        icon={<Alarm />}
                    />
                </YStack>
                <YStack gap={10} width={'100%'} marginBottom={20} display="flex" flexDirection="row">
                    <CustomInput
                        width={'49%'}
                        keyboardType="numeric"
                        placeholder="Max people"
                        icon={<Person />}
                    />
                    <CustomInput
                        width={'48%'}
                        keyboardType="numeric"
                        placeholder="Min people"
                        icon={<Person />}
                    />
                </YStack>
                <YStack marginBottom={20}>
                    <CustomInput
                        placeholder="Club"
                        icon={<Tennis />}
                    />
                </YStack>
                <YStack marginBottom={20}>
                    <CustomInput
                        placeholder="Court"
                        icon={<Portrait />}
                    />
                </YStack>
                <YStack marginBottom={20}>
                    <CustomInput
                        keyboardType="numeric"
                        placeholder="Recurrence"
                        icon={<Recurrence />}
                    />
                </YStack>
                <YStack marginBottom={20}>
                    <CustomInput
                        placeholder="Tags"
                        icon={<StyleIcon />}
                    />
                </YStack>
                <YStack marginBottom={20}>
                    <CustomInput
                        placeholder="Payment mode"
                        icon={<Payment />}
                    />
                </YStack>
                <YStack marginBottom={20}>
                    <CustomInput
                        keyboardType="numeric"
                        placeholder="Min age"
                        icon={<TimeIcon />}
                    />
                </YStack>
                <YStack marginBottom={20} alignItems="center" alignSelf="center">
                    <CustomButton title="PUBLISH" onPress={() => { }}></CustomButton>
                </YStack>
            </YStack>
        </ScrollView>
    )
}