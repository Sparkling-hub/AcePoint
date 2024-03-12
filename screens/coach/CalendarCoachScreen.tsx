import { useSelector } from "react-redux";
import AgendaCoachScreen from "./AgendaCoachScreen";
import WeeklyCalendarCoachScreen from "./WeeklyCalendarCoachScreen";
import { useEffect, useState } from "react";
import { getLessonsByCoachId } from "@/api/lesson-api";

export default function CalendarCoachScreen() {
    const result = useSelector((state: any) => state.calendarOption);
    const [lessons, setLessons] = useState([]);
    const [lessonsForWeeklyView, setLessonsForWeeklyView] = useState([]);
    const [currentWeek, setCurrentWeek] = useState('');
    useEffect(() => {
        const getLessons = async () => {
            const lessons = await getLessonsByCoachId();
            setLessons(lessons);
            const updatedLessonsForWeeklyView = lessons.reduce((acc, lesson) => {
                const startDate = new Date(lesson.startDate.seconds * 1000);
                const endDate = new Date(lesson.endDate.seconds * 1000);
                switch (lesson.recurrence) {
                    case "Daily":
                    case "EveryWeekDay":
                        while (startDate <= endDate) {
                            if (lesson.recurrence === "EveryWeekDay" && (startDate.getDay() === 0 || startDate.getDay() === 6)) {
                                startDate.setDate(startDate.getDate() + 1);
                                continue;
                            }
                            acc.push({ ...lesson, startDate: { seconds: startDate.getTime() / 1000 } });
                            startDate.setDate(startDate.getDate() + 1);
                        }
                        break;
                    case "Weekly":
                        while (startDate <= endDate) {
                            acc.push({ ...lesson, startDate: { seconds: startDate.getTime() / 1000 } });
                            startDate.setDate(startDate.getDate() + 7);
                        }
                        break;
                    default:
                        acc.push(lesson);
                        break;
                }
                return acc;
            }, []);
            setLessonsForWeeklyView(updatedLessonsForWeeklyView);
        }
        const getCurrentWeek = () => {
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
        }
        result.option === 'W' ?
            getCurrentWeek() :
            getLessons()
    }, [])
    return (
        <>
            {result.option === 'W'
                ? <WeeklyCalendarCoachScreen lessons={lessonsForWeeklyView} currentWeek={currentWeek} />
                : <AgendaCoachScreen lessons={lessons} />
            }
        </>
    );
}
