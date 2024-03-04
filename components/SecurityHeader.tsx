import { ChevronLeft } from "@tamagui/lucide-icons";
import CustomHeader from "./CustomHeader";
import { TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import HeaderText from "./HeaderText";

export default function SecurityHeader() {
    return (
        <CustomHeader
            leftIcon={<ChevronLeft size={'$3'} color={Colors.secondary} />}
            title="SECURITY"
            rightContent={
                <TouchableOpacity onPress={() => { }}>
                    <HeaderText text="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" />
                </TouchableOpacity>
            }
        ></CustomHeader>
    )
}