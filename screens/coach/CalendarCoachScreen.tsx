import { useSelector } from "react-redux";
import AgendaCoachScreen from "./AgendaCoachScreen";
import WeeklyCalendarCoachScreen from "./WeeklyCalendarCoachScreen";
import { useEffect, useState } from "react";
import { getLessonsByCoachId, getLessonsByPlayerId } from "@/api/lesson-api";
import { useIsFocused } from '@react-navigation/native';
import { retrieveData } from "@/api/localStorage";
import { RootState } from "@/store/store";

export default function CalendarCoachScreen() {
    const [isLoading, setIsLoading] = useState(true)
    const result = useSelector((state: any) => state.calendarOption);
    const [lessons, setLessons] = useState([]);
    const [currentWeek, setCurrentWeek] = useState('');
    const isFocused = useIsFocused();
    const userRole = useSelector((state: RootState) => state.userRole);
    const userRoleValue = userRole.userRole;

    useEffect(() => {
        const getLessons = async () => {
            setIsLoading(true)
                const userID = await retrieveData('userID')
                let lessonss = []
                if (userID) {
                    lessonss = userRoleValue === 'Coach' ? await getLessonsByCoachId(userID) : await getLessonsByPlayerId(userID)
                }
                setLessons(lessonss);

            setIsLoading(false)
        }
        const getCurrentWeek = () => {
            setIsLoading(true)
            const currentDate = new Date();
            const firstDayOfWeek = currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1);
            const lastDayOfWeek = firstDayOfWeek + 6;
            const firstDay = new Date(currentDate.setDate(firstDayOfWeek));
            const lastDay = new Date(currentDate.setDate(lastDayOfWeek));
            firstDay.setHours(12, 0, 0, 0);
            lastDay.setHours(12, 0, 0, 0);
            const firstDayISO = firstDay.toISOString();
            const lastDayISO = lastDay.toISOString();
            setCurrentWeek(`${firstDayISO} ${lastDayISO}`);
            setIsLoading(false)
        }
        if (isFocused) {
            result.option === 'W' ? getCurrentWeek() : getLessons();
        }
        console.log(isFocused.toString());
        
    }, [isFocused, result.option]);

    if (isLoading) return (<></>)
    return (
        <>
            {result.option === 'W'
                ? <WeeklyCalendarCoachScreen lessons={lessons} currentWeek={currentWeek} />
                : <AgendaCoachScreen lessons={lessons} />
            }
        </>
    );
}
