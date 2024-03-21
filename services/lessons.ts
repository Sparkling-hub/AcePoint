export const getUpdatedLessonsForWeeklyView = (lessons: any[]) => {
    return lessons.reduce((acc: any[], lesson: any) => {
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
};


export const getCurrentWeek = () => {
    const currentDate = new Date();
    const firstDayOfWeek = currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1);
    const lastDayOfWeek = firstDayOfWeek + 6;
    const firstDay = new Date(currentDate.setDate(firstDayOfWeek));
    const lastDay = new Date(currentDate.setDate(lastDayOfWeek));
    firstDay.setHours(12, 0, 0, 0);
    lastDay.setHours(12, 0, 0, 0);
    const firstDayISO = firstDay.toISOString();
    const lastDayISO = lastDay.toISOString();
    return `${firstDayISO} ${lastDayISO}`;
}
