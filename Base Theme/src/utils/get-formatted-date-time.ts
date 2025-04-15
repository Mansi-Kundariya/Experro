/**
 * Formats a date value into the format "Month Day, Year".
 * @param  inputDateString - The date value to be formatted (in the format "YYYY-MM-DD").
 * @returns Formatted date string in the format "Month Day, Year".
 */

export const getFormattedDateTime = (inputDateString: string) => {
  // Create a Date object from the input date string
  const date: Date = new Date(inputDateString);

  // Get day, month, year, hours, and minutes
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Function to add ordinal suffix to the day
  function getOrdinalSuffix(day: number) {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    } else {
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    }
  }

  // Function to convert hours to AM/PM format
  function formatAMPM(hours: number) {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    let formattedHours = hours % 12;
    formattedHours = formattedHours ? formattedHours : 12; // Convert 0 to 12 for 12 AM
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  // Construct the formatted date and time string
  const formattedDate = `${getOrdinalSuffix(
    day
  )} ${month} ${year} @ ${formatAMPM(hours)}`;

  // Output the formatted date
  return formattedDate;
};
