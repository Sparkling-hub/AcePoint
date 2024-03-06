import { useSelector } from "react-redux";
import AgendaCoachScreen from "./AgendaCoachScreen";
import WeeklyCalendarCoachScreen from "./WeeklyCalendarCoachScreen";

export default function CalendarCoachScreen() {
    const result = useSelector((state: any) => state.calendarOption);

    return (
        <>
            {result.option === 'W'
                ? <WeeklyCalendarCoachScreen />
                : <AgendaCoachScreen />
            }
        </>
    );
}
