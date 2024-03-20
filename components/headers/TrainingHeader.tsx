import Colors from "@/constants/Colors";
import CustomHeader from "../CustomHeader";
import { useRouter } from 'expo-router';
import { ChevronLeft } from "@tamagui/lucide-icons";
import { TouchableOpacity } from "react-native";
import { Text } from "tamagui";

export default function TrainingHeader({ testID }: { readonly testID: string }) {
    const router = useRouter()
    return (
        <>
            <TouchableOpacity testID={testID}></TouchableOpacity>
            <CustomHeader
                leftIcon={<ChevronLeft size={'$3'} color={Colors.secondary} />}
                onLeftPress={() => {
                    router.navigate('/(tabs)/calendar-coach');
                }}
                rightContent={
                    <TouchableOpacity onPress={() => {
                        router.push({
                            pathname: "/new-training",
                            params: { mode: 'EDIT TRAINING' },
                        });
                    }}>
                        <Text color={Colors.secondary} marginRight={10} fontSize={20} fontWeight={'bold'}>EDIT</Text>
                    </TouchableOpacity>
                }
            >
            </CustomHeader>
        </>

    )
}