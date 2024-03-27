import Colors from "@/constants/Colors";
import CustomHeader from "../CustomHeader";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Text } from "tamagui";

export default function PlayerCalendarHeader() {
    const coach = useSelector((state: RootState) => state.coach);
    const coachName = coach.displayName;
    return (
        <CustomHeader
            leftIcon={<ChevronLeft size={'$2.5'} color={Colors.secondary} />}
            title={`${coachName}'s Schedule`}
            rightContent={<Text></Text>}
        />

    )
}