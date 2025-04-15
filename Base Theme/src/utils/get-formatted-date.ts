/**
 * Formats a date value into the format "Month Day, Year".
 * @param  dateValue - The date value to be formatted (in the format "YYYY-MM-DD").
 * @returns Formatted date string in the format "Month Day, Year".
 */
export const getFormattedDate = (dateValue?: string) => {
  const fullMonthNameObj: any = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  };

  const splitDate = dateValue?.split('-');

  if (splitDate) {
    const fullMonthName = fullMonthNameObj[splitDate[1]];
    return `${fullMonthName} ${splitDate[2]}, ${splitDate[0]}`;
  } else {
    return '';
  }
};
