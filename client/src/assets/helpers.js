function getDateAfterDays(startDate, x) {
    // Convert the input to a Date object
    const start = new Date(startDate);

    // Check if the input date is valid
    if (isNaN(start)) {
        throw new Error("Invalid date format. Please provide a valid date.");
    }

    // Add x days in milliseconds
    const resultDate = new Date(start.getTime() + x * 24 * 60 * 60 * 1000);

    // Return the result date
    return resultDate.toUTCString();
}
function formatToUTCString(dateString) {
    try {
        // Parse the input date string into a Date object
        const date = new Date(dateString);

        // Check if the input date is valid
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format');
        }

        // Convert to UTC string
        return date.toUTCString();
    } catch (error) {
        return `Error: ${error.message}`;
    }
}
export { getDateAfterDays, formatToUTCString }