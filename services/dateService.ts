// Function to convert a timestamp to a date string

const date = (time: any) => {
    // Create a new Date object from the provided timestamp
    const date = new Date(time * 1000);
    // Convert the date to an ISO string and split it at the 'T' character
    const formattedDate = date.toISOString().split('T')[0];
    // Return the formatted date
    return formattedDate;
};

// Function to convert a timestamp to a time string
const time = (time: any) => {
    // Create a new Date object from the provided timestamp
    const date = new Date(time * 1000);
    // Get the hours and minutes from the date
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    // Format the minutes to have a leading zero if less than 10
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    // Return the time string in the format "HH:MM"
    return `${hours}:${formattedMinutes}`;
};

// Function to add a duration to a start date/
function addDurationToStartDate(startDate: string, duration: string): string {
    // Split the start date and duration into hours and minutes
    const [hours, minutes] = startDate.split(':').map(Number);
    const [durationHours, durationMinutes] = duration.split(':').map(Number);
    // Add the duration to the start date
    let newHours = hours + durationHours;
    let newMinutes = minutes + durationMinutes;
    // If the minutes exceed 60, adjust the hours and reset the minutes
    if (newMinutes >= 60) {
        newHours += Math.floor(newMinutes / 60);
        newMinutes = '00';
    }

    // Return the new time in the format "HH:MM"
    return `${newHours}:${newMinutes}`;
}

export { date, time, addDurationToStartDate }