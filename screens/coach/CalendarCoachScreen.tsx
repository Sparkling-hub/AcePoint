import { useSelector } from "react-redux";
import AgendaCoachScreen from "./AgendaCoachScreen";
import WeeklyCalendarCoachScreen from "./WeeklyCalendarCoachScreen";
import { Text, View } from "tamagui";

export default function CalendarCoachScreen() {
    const result = useSelector((state: any) => state.calendarOption);
    return (
        <>
            {result.option === 'W'
                ? <View flex={1} justifyContent="flex-start">
                    <WeeklyCalendarCoachScreen />
                </View>
                : <AgendaCoachScreen />
            }
        </>
    );
}