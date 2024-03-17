import Colors from "@/constants/Colors";
import CustomHeader from "../CustomHeader";
import { router } from 'expo-router';
import { ChevronLeft } from "@tamagui/lucide-icons";
import { TouchableOpacity } from "react-native";

export default function TrainingHeader({ testID }: { readonly testID: string }) {
    return (
        <>
            <TouchableOpacity testID={testID}></TouchableOpacity>
            <CustomHeader
                leftIcon={<ChevronLeft size={'$3'} color={Colors.secondary} />}
                onLeftPress={() => {
                    router.navigate('/(tabs)/calendar-coach');
                }}
            >
            </CustomHeader>
        </>

    )
}