import Colors from "@/constants/Colors";
import CustomHeader from "./CustomHeader";
import { ChevronLeft } from "@tamagui/lucide-icons";
import { TouchableOpacity } from "react-native";
import HeaderText from "./HeaderText";

export default function LegalHeader() {
    return (
        <CustomHeader
            leftIcon={<ChevronLeft size={'$3'} color={Colors.secondary} />}
            title="LEGAL"
            rightContent={
                <TouchableOpacity onPress={() => { }}>
                    <HeaderText text="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" />
                </TouchableOpacity>
            }
        ></CustomHeader>
    )
}