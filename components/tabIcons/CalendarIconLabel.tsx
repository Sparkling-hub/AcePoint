import TabBarText from "../TabBarText";
import { TouchableOpacity } from "react-native";

export default function CalendarIconLabel({ focused, testID }: { readonly focused: boolean, readonly testID?: string }) {
    return (
        <TouchableOpacity testID={testID}>
            <TabBarText focused={focused} text="Calendar" />
        </TouchableOpacity>

    )
}