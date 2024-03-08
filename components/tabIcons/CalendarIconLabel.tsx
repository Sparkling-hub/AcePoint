import { View } from "tamagui";
import TabBarText from "../TabBarText";
import { TouchableOpacity } from "react-native";

export default function CalendarIconLabel({ focused, testID }: { readonly focused: boolean, readonly testID?: string }) {
    return (
        <View>
            <TouchableOpacity testID={testID}>
            </TouchableOpacity>
            <TabBarText focused={focused} text="Calendar" />
        </View>



    )
}