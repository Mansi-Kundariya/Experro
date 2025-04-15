import { ExpFormBuilderField } from '../interface';

export function validateDateAndTime(
  formField: ExpFormBuilderField,
  dateInput: any
) {
  const fieldProperties: any = formField.properties;

  const date = dateInput.date;
  const dateValidationObj = {
    value: '',
    isValid: fieldProperties?.isRequired ? false : true,
  };
  const timeFormat = fieldProperties?.timeFormat === '12-hours';

  let format = '';
  if (fieldProperties.dateFieldType === 'time') {
    format = fieldProperties.timeFormat;
  } else {
    format = fieldProperties.dateFormat;
  }

  const formatHours = (hour: any) => {
    if (timeFormat) {
      if (parseInt(hour) > 12) {
        return parseInt(hour) - 12;
      } else {
        return parseInt(hour);
      }
    } else {
      return parseInt(hour);
    }
  };

  switch (fieldProperties.dateFieldType) {
    case 'date':
      switch (format) {
        case 'mm-dd-yy':
          dateValidationObj[
            'value'
          ] = `${date?.month}-${date?.day}-${date?.year}`;
          dateValidationObj['isValid'] = true;
          break;
        case 'yy-mm-dd':
          dateValidationObj[
            'value'
          ] = `${date?.year}-${date?.month}-${date?.day}`;
          dateValidationObj['isValid'] = true;
          break;
        default:
          dateValidationObj[
            'value'
          ] = `${date?.day}-${date?.month}-${date?.year}`;
          dateValidationObj['isValid'] = true;
          break;
      }
      break;
    case 'time':
      switch (format) {
        case '12-hours':
          dateValidationObj['value'] = `${
            formateHoursMinutes(formatHours(dateInput?.hour)) || '00'
          }:${formateHoursMinutes(dateInput?.minutes) || '00'} ${
            dateInput?.period
          }`;
          dateValidationObj['isValid'] = true;
          break;
        default:
          dateValidationObj['value'] = `${
            formateHoursMinutes(formatHours(dateInput?.hour)) || '00'
          }:${formateHoursMinutes(dateInput?.minutes) || '00'}`;
          dateValidationObj['isValid'] = true;
          break;
      }
      break;
    case 'dateAndTime':
      switch (format) {
        case 'mm-dd-yy':
          dateValidationObj['value'] = `${date?.month}-${date?.day}-${
            date?.year
          }, ${formateHoursMinutes(
            formatHours(dateInput?.hour)
          )}:${formateHoursMinutes(dateInput?.minutes)} ${
            timeFormat ? dateInput?.period : ''
          }`;
          dateValidationObj['isValid'] = true;
          break;
        case 'yy-mm-dd':
          dateValidationObj['value'] = `${date?.year}-${date?.month}-${
            date?.day
          }, ${formateHoursMinutes(
            formatHours(dateInput?.hour)
          )}:${formateHoursMinutes(dateInput?.minutes)} ${
            timeFormat ? dateInput?.period : ''
          }`;
          dateValidationObj['isValid'] = true;
          break;
        default:
          dateValidationObj['value'] = `${date?.day}-${date?.month}-${
            date?.year
          }, ${formateHoursMinutes(
            formatHours(dateInput?.hour)
          )}:${formateHoursMinutes(dateInput?.minutes)} ${
            timeFormat ? dateInput?.period : ''
          }`;
          dateValidationObj['isValid'] = true;
          break;
      }
      break;
  }
  return dateValidationObj;
}

function formateHoursMinutes(hoursMinutes: any) {
  if (
    parseInt(hoursMinutes) < 10 &&
    hoursMinutes !== '00'
  ) {
    return `0${hoursMinutes}`;
  }

  return hoursMinutes;
}
