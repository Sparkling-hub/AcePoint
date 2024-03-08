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
            const lessons = await getLessonsByCoachId()
            setLessons(lessons);
            lessons.forEach(lesson => {
                if (lesson.recurrence === "Daily") {
                    const startDate = new Date(lesson.startDate.seconds * 1000);
                    const endDate = new Date(lesson.endDate.seconds * 1000);
                    while (startDate <= endDate) {
                        const newLesson = { ...lesson, startDate: { seconds: startDate.getTime() / 1000 } };
                        setLessonsForWeeklyView(prev => [...prev, newLesson]);
                        startDate.setDate(startDate.getDate() + 1);
                    }
                } else {
                    setLessonsForWeeklyView(prev => [...prev, lesson]);
                }
            });
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
        getCurrentWeek()
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
