import TabBarText from "../TabBarText";

export default function CalendarIconLabel({ focused }: { readonly focused: boolean }){
    return(
        <TabBarText focused={focused} text="Calendar" />
    )
}