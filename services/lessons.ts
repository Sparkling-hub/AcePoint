export const getUpdatedLessonsForWeeklyView = (lessons: any[]) => {
    // This function takes an array of lessons and returns an updated array of lessons for weekly view.
    // It uses the reduce method to iterate over each lesson and update its start date based on the recurrence.
    // The updated lessons are then added to the accumulator array.
    return lessons.reduce((acc: any[], lesson: any) => {
        // Convert the start and end dates of the lesson to Date objects
        const startDate = new Date(lesson.startDate.seconds * 1000);
        const endDate = new Date(lesson.endDate.seconds * 1000);
        // Switch statement to handle different recurrence types
        switch (lesson.recurrence) {
            // If the lesson is daily or every weekday
            case "Daily":
            case "EveryWeekDay":
                // Loop over each day from the start date to the end date
                while (startDate <= endDate) {
                    // If the lesson is every weekday and the current day is a weekend day, skip to the next day
                    if (lesson.recurrence === "EveryWeekDay" && (startDate.getDay() === 0 || startDate.getDay() === 6)) {
                        startDate.setDate(startDate.getDate() + 1);
                        continue;
                    }
                    // Add the updated lesson to the accumulator array
                    acc.push({ ...lesson, startDate: { seconds: startDate.getTime() / 1000 } });
                    // Move to the next day
                    startDate.setDate(startDate.getDate() + 1);
                }
                break;
            // If the lesson is weekly
            case "Weekly":
                // Loop over each week from the start date to the end date
                while (startDate <= endDate) {
                    // Add the updated lesson to the accumulator array
                    acc.push({ ...lesson, startDate: { seconds: startDate.getTime() / 1000 } });
                    // Move to the next week
                    startDate.setDate(startDate.getDate() + 7);
                }
                break;
            // If the lesson has no recurrence
            default:
                // Add the lesson to the accumulator array without any changes
                acc.push(lesson);
                break;
        }
        // Return the accumulator array
        return acc;
    }, []);
};


