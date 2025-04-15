import React, { useState } from 'react';

const getDefaultPeriod = (date: Date) => {
  return date.getHours() > 12 ? 'PM' : 'AM';
};

const getHoursBy12HoursFormat = (date: Date, use12HourFormat: boolean) => {
  let hours: number;
  if (use12HourFormat) {
    hours =
      getDefaultPeriod(date) === 'PM' ? date.getHours() - 12 : date.getHours();
  } else {
    hours = date.getHours();
  }
  return hours;
};

const ExpDatePicker = ({
  onSelect,
  yearMonthDropDown = true,
  showTimePicker = false,
  use12HourFormat = false,
  timePickerOnly = false,
  defaultDate = new Date(),
}: {
  onSelect: any;
  yearMonthDropDown?: boolean;
  showTimePicker?: boolean;
  use12HourFormat?: boolean;
  timePickerOnly?: boolean;
  defaultDate?: Date;
}) => {
  const [selectedDate, setSelectedDate] = useState<any>(defaultDate);
  const [currentMonth, setCurrentMonth] = useState<any>(
    defaultDate || new Date()
  );
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = use12HourFormat
    ? Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'))
    : Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  const [selectedHour, setSelectedHour] = useState<any>(
    defaultDate ? getHoursBy12HoursFormat(defaultDate, use12HourFormat) : '00'
  );
  const [selectedMinute, setSelectedMinute] = useState<any>(
    defaultDate ? defaultDate.getMinutes() : '00'
  );
  const [selectedPeriod, setSelectedPeriod] = useState(
    getDefaultPeriod(defaultDate || new Date())
  );

  const getDaysInMonth = (date: any) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push(currentDate);
    }

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.unshift(null);
    }
    return days;
  };

  const handleDateClick = (day: any) => {
    day.setHours(selectedHour);
    day.setMinutes(selectedMinute);
    if (day) {
      setSelectedDate(day);

      onSelect({
        fullDate: day,
        date: {
          day: day.getDate(),
          year: day.getFullYear(),
          month: day.getMonth()+1,
        },
        hour: selectedHour,
        minutes: selectedMinute,
        period: selectedPeriod,
      });
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), parseInt(e.target.value))
    );
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setMonth(parseInt(e.target.value));
    setSelectedDate(selectedDateTime);
    onSelect({
      fullDate: selectedDateTime,
      date: {
        day: selectedDate?.getDate(),
        year: selectedDate?.getFullYear(),
        month: selectedDateTime?.getMonth()+1,
      },
      hour: selectedDateTime.getHours(),
      minutes: selectedDateTime.getMinutes(),
      period: selectedPeriod,
    });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(
      new Date(parseInt(e.target.value), currentMonth.getMonth())
    );
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setFullYear(parseInt(e.target.value));
    setSelectedDate(selectedDateTime);
    onSelect({
      fullDate: selectedDateTime,
      date: {
        day: selectedDate?.getDate(),
        year: selectedDateTime?.getFullYear(),
        month: selectedDate?.getMonth()+1,
      },
      hour: selectedDateTime.getHours(),
      minutes: selectedDateTime.getMinutes(),
      period: selectedPeriod,
    });
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      (prevMonth: any) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1)
    );
    const selectedDateTime = new Date(selectedDate);
    const _curruntMonth = selectedDate?.getMonth();

    selectedDateTime.setMonth(_curruntMonth === 1 ? 12 : _curruntMonth - 1);
    setSelectedDate(selectedDateTime);
    onSelect({
      fullDate: selectedDateTime,
      date: {
        day: selectedDate?.getDate(),
        year: selectedDate?.getFullYear(),
        month: selectedDateTime?.getMonth()+1,
      },
      hour: selectedDateTime.getHours(),
      minutes: selectedDateTime.getMinutes(),
      period: selectedPeriod,
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prevMonth: any) =>
        new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1)
    );
    const selectedDateTime = new Date(selectedDate);
    const _curruntMonth = selectedDate?.getMonth();

    selectedDateTime.setMonth(_curruntMonth === 12 ? 1 : _curruntMonth + 1);
    setSelectedDate(selectedDateTime);
    onSelect({
      fullDate: selectedDateTime,
      date: {
        day: selectedDate?.getDate(),
        year: selectedDate?.getFullYear(),
        month: selectedDateTime?.getMonth()+1,
      },
      hour: selectedDateTime.getHours(),
      minutes: selectedDateTime.getMinutes(),
      period: selectedPeriod,
    });
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHour(e.target.value);
    const selectedDateTime = new Date(selectedDate);
    if (use12HourFormat) {
      if (selectedPeriod === 'PM' && parseInt(e.target.value) === 12) {
        selectedDateTime.setHours(parseInt(e.target.value));
      } else if (selectedPeriod === 'PM' && parseInt(e.target.value) !== 12) {
        selectedDateTime.setHours(parseInt(e.target.value) + 12);
      } else if (selectedPeriod === 'AM') {
        if (parseInt(e.target.value) === 12) {
          selectedDateTime.setHours(0);
        } else {
          selectedDateTime.setHours(parseInt(e.target.value));
        }
        // selectedDateTime.setHours(
        //   parseInt(e.target.value) === 12 ? 0 : parseInt(e.target.value)
        // );
      }
    } else {
      selectedDateTime.setHours(parseInt(e.target.value));
    }
    selectedDateTime.setMinutes(parseInt(selectedMinute));
    onSelect({
      fullDate: selectedDateTime,
      date: {
        day: selectedDate?.getDate(),
        year: selectedDate?.getFullYear(),
        month: selectedDate?.getMonth()+1,
      },
      hour: selectedDateTime.getHours(),
      minutes: selectedDateTime.getMinutes(),
      period: selectedPeriod,
    });
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMinute(e.target.value);
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setMinutes(parseInt(e.target.value));
    selectedDateTime.setHours(parseInt(selectedHour));
    onSelect({
      fullDate: selectedDateTime,
      date: {
        day: selectedDate?.getDate(),
        year: selectedDate?.getFullYear(),
        month: selectedDate?.getMonth()+1,
      },
      hour: selectedDateTime.getHours(),
      minutes: selectedDateTime.getMinutes(),
      period: selectedPeriod,
    });
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(e.target.value);
    const selectedDateTime = new Date(selectedDate);
    const hour = parseInt(selectedHour);

    if (hour === 12) {
      if (e.target.value === 'PM') {
        selectedDateTime.setHours(hour);
      } else {
        selectedDateTime.setHours(0);
      }
    } else {
      if (e.target.value === 'PM') {
        selectedDateTime.setHours(hour + 12);
      } else {
        selectedDateTime.setHours(hour);
      }
    }

    // selectedDateTime.setHours(
    //   e.target.value === 'PM' ? hour + 12 : hour === 12 ? 0 : hour
    // );
    selectedDateTime.setMinutes(parseInt(selectedMinute));
    onSelect({
      fullDate: selectedDateTime,
      date: {
        day: selectedDate?.getDate(),
        year: selectedDate?.getFullYear(),
        month: selectedDate?.getMonth()+1,
      },
      hour: selectedDateTime.getHours(),
      minutes: selectedDateTime.getMinutes(),
      period: e.target.value,
    });
  };

  return (
    <div className="mt-[0.5625rem] date-picker-modal">
      {!timePickerOnly && (
        <>
          <div className="flex items-center justify-center gap-4 mb-3 date-picker-modal-header">
            <button
              type="button"
              className="nav-button bg-transparent border-0 cursor-pointer text-base"
              onClick={handlePrevMonth}>
              &lt;
            </button>
            {yearMonthDropDown && (
              <select
                className="appearance-auto p-1 form-select"
                value={currentMonth.getMonth()}
                onChange={(e) => handleMonthChange(e)}>
                {Array.from({ length: 12 }, (_, i) => i).map((month) => (
                  <option key={month} value={month}>
                    {new Date(0, month).toLocaleString('en-US', {
                      month: 'long',
                    })}
                  </option>
                ))}
              </select>
            )}

            {yearMonthDropDown && (
              <select
                className="appearance-auto p-1 form-select "
                value={currentMonth.getFullYear()}
                onChange={(e) => handleYearChange(e)}>
                {Array.from({ length: 500 }, (_, i) => i + 1900).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            )}
            <button
              type="button"
              className="nav-button bg-transparent border-0 cursor-pointer text-base"
              onClick={handleNextMonth}>
              &gt;
            </button>
          </div>
          <div className="weekdays text-sm mb-2 grid grid-cols-7 text-center">
            {weekdays.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="days grid grid-cols-7 text-sm place-items-center">
            {getDaysInMonth(currentMonth).map((day, index) => (
              <div
                key={index}
                className={`day w-9 h-9 p-1 text-center cursor-pointer flex items-center justify-center ${day ? '' : 'empty invisible'
                  } ${selectedDate &&
                    day &&
                    day.getDate() === selectedDate.getDate()
                    ? 'selected font-medium bg-primary text-white'
                    : ''
                  }`}
                onClick={() => handleDateClick(day)}>
                {day ? day.getDate() : ''}
              </div>
            ))}
          </div>
        </>
      )}

      {(showTimePicker || timePickerOnly) && (
        <div className="time-picker">
          <select
            value={
              typeof selectedHour === 'number'
                ? selectedHour.toString().padStart(2, '0')
                : selectedHour
            }
            onChange={handleHourChange}>
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          :
          <select
            value={
              typeof selectedMinute === 'number'
                ? selectedMinute.toString().padStart(2, '0')
                : selectedMinute
            }
            onChange={handleMinuteChange}>
            {minutes.map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
          {use12HourFormat && (
            <select value={selectedPeriod} onChange={handlePeriodChange}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpDatePicker;
