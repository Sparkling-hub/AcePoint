const date = (time: any) => {
    const date = new Date(time * 1000);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
};
const time = (time: any) => {
    const date = new Date(time * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes}`;
};
function addDurationToStartDate(startDate: string, duration: string): string {
    const [hours, minutes] = startDate.split(':').map(Number);
    const [durationHours, durationMinutes] = duration.split(':').map(Number);
    let newHours = hours + durationHours;
    let newMinutes = minutes + durationMinutes;
    if (newMinutes >= 60) {
        newHours += Math.floor(newMinutes / 60);
        newMinutes = '00';
    }

    return `${newHours}:${newMinutes}`;
}

export { date, time, addDurationToStartDate }