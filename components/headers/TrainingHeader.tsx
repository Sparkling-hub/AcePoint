import Colors from "@/constants/Colors";
import CustomHeader from "../CustomHeader";
import { useRouter } from 'expo-router';
import { ChevronLeft } from "@tamagui/lucide-icons";
import { TouchableOpacity } from "react-native";
import { Text } from "tamagui";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function TrainingHeader({ testID }: { readonly testID: string }) {
    const router = useRouter()
    const user = useSelector((state: RootState) => state.userRole);
    const userRole = user.userRole;
    const nav = () => {
        userRole === 'Coach'
            ? router.navigate('/(tabs)/calendar-coach')
            : router.replace('/(tabs)/book/coach-availability');
    }
    const editButton = () => {
        userRole === 'Coach' ? (<TouchableOpacity onPress={() => {
            router.push({
                pathname: "/new-training",
                params: { mode: 'EDIT TRAINING' },
            });
        }}>
            <Text color={Colors.secondary} marginRight={10} fontSize={20} fontWeight={'bold'}>EDIT</Text>
        </TouchableOpacity>)
            : (<></>)
    }
    return (
        <>
            <TouchableOpacity testID={testID}></TouchableOpacity>
            <CustomHeader
                leftIcon={<ChevronLeft size={'$3'} color={Colors.secondary} />}
                onLeftPress={nav}
                rightContent={editButton()}
            >
            </CustomHeader>
        </>

    )
}