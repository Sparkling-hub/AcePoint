import Colors from "@/constants/Colors";
import CustomHeader from "../CustomHeader";
import { router } from 'expo-router';
import { ChevronLeft } from "@tamagui/lucide-icons";

export default function TrainingHeader() {
    return (
        <CustomHeader
            leftIcon={<ChevronLeft size={'$3'} color={Colors.secondary} />}
            onLeftPress={() => {
                router.navigate('/(tabs)/calendar-coach');
            }}
        />
    )
}