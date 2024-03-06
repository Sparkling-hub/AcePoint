import TabBarText from "../TabBarText";

export default function CalendarIconLabel({ focused }: { focused: boolean }){
    return(
        <TabBarText focused={focused} text="Calendar" />
    )
}