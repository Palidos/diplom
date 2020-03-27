import OperateDate from './operateDate';

// Setting lesson's hours and minutes to date
export const getLessonDate = (date, time) => {
  const newDate = new Date(date);
  newDate.setHours(...time);

  return newDate;
};

// Getting the closest test/exam date's data
export const getClosestDate = (isStrict, dateLesson, dateTestArr, time) =>
  dateTestArr.filter(testObj => (isStrict
    ? (testObj.date.getTime() - getLessonDate(dateLesson, time).getTime()) === 0
    : (testObj.date.getTime() - getLessonDate(dateLesson, time).getTime()) >= 0),
  )[0];

// Parsing the first hour value from hours array
export const getFirstHour = hours => hours[0].split(':')[0];

// Get minutes from time string ('12:34' like)
export const getMinutesFromTime = (start, end) =>
  (Number(end.split(':')[0]) * 60 + Number(end.split(':')[1])) -
  (Number(start.split(':')[0]) * 60 + Number(start.split(':')[1]));

// Getting current time as percentage from whole workday (with filter)
export const getPosition = (
  hours = 0,
  minutes = 0,
  hoursAmount = 1,
  startHour = 0,
) => {
  const minsTotalNorm = Number(hours) * 60 + Number(minutes) - (Number(startHour) * 60);
  const minAsPerCent = (100 / (hoursAmount * 60)).toFixed(5);
  const result = minsTotalNorm * minAsPerCent;

  return result < 0
    ? '0'
    : result >= 100
      ? '100'
      : result;
};

// Parsing timings from string
export const getLessonTime = timeString => timeString.split(':').slice(0, 2);

// Check if date is relevenat (in the range of initDate and lastDate)
export const isDateRelevant = (
  initLesson,
  lastLesson,
  date,
  start,
) => Boolean((initLesson.getTime() <= getLessonDate(date, getLessonTime(start)).getTime()) &&
  (lastLesson.getTime() >= getLessonDate(date, getLessonTime(start)).getTime()));

// Check is chosen date is today
export const isToday = (date, compareDate = new Date()) =>
  date.getFullYear() === compareDate.getFullYear() &&
  date.getMonth() === compareDate.getMonth() &&
  date.getDate() === compareDate.getDate();


// Getting array of current weekdays (as objects with params)
export const getWeekDays = (date, showWeek) => {
  // Getting first letter of weekday name
  const getWeekDayLetter = format =>
    new Intl.DateTimeFormat('en-GB', { weekday: 'short' }).format(format)[0];

  // Getting correct dates of current weekdays
  const getNewDate = (dayDate, increment) => // Manipulations to set Monday as a first day
    dayDate.getDate() - ((dayDate.getDay() + 6) % 7) + increment;

  // Getting params of current weekday
  const getDateParams = (day, index) => {
    const newDate = new Date(day.setDate(getNewDate(day, index)));

    return {
      date: newDate.getDate(),
      weekday: getWeekDayLetter(newDate),
      weekdayNum: newDate.getDay(),
      month: newDate.getMonth() + 1,
      year: newDate.getFullYear(),
      dateFullObj: newDate,
      dateFull: OperateDate.constructDateString(newDate),
    };
  };

  return showWeek
    ? Array(7)
      .fill(new Date(date))
      .map((day, index) =>
        getDateParams(day, index))
    : [
      {
        date: date.getDate(),
        weekday: getWeekDayLetter(date),
        weekdayNum: date.getDay(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        dateFullObj: date,
        dateFull: OperateDate.constructDateString(date),
      },
    ];
};

// '2019-10-25T13:00:00' => '13:00'
export const getTimeFromDate = (date = new Date()) =>
  new Date(date).toLocaleString('ru', {
    hour: 'numeric',
    minute: 'numeric',
  });

// '13:00' + '01:00:00' => '14:00'
export const addDurationToStart = (startTimeDate, durationString) => {
  const durationTimeArr = durationString.split(':');
  const durationMins = Number(durationTimeArr[0]) * 60 + Number(durationTimeArr[1]);
  const endTimeDate = new Date(new Date(startTimeDate).getTime() + durationMins * 60000);

  return endTimeDate;
};

// [09:00, 10:00, ..., 17:00] => [09:00, 09:15, ..., 17:45, 18:00]
export const getHoursWithMins = hoursWhole =>
  [
    ...hoursWhole
      .map(hour =>
        [
          '00',
          '15',
          '30',
          '45',
        ].map(mins =>
          `${hour.slice(0, 2)}:${mins}`))
      .flat(),
    `${parseInt(hoursWhole[hoursWhole.length - 1], 10) + 1}:00`,
  ];

// '01:10:00' => 70
export const timeStrToMins = timeStr => {
  const timeArr = timeStr.split(':').map(Number);
  return timeArr[0] * 60 + timeArr[1];
};

// 70 => '01:10:00'
export const minsToTimeStr = mins => {
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}:00`;
};

// '2019-10-25T13:00:00' + '01:30:00' => { start: '13:00', end: '14:30' }
export const convertDateToStartEndTimeStrings = (startDate, duration) => {
  const start = getTimeFromDate(startDate);
  const endDate = addDurationToStart(startDate, duration);
  const end = getTimeFromDate(endDate);

  return {
    start,
    end,
  };
};

// '2019-10-25T13:00:00' + '01:00:00' => true / false
export const isNow = (date, duration) => {
  const { start, end } = convertDateToStartEndTimeStrings(date, duration);
  const currentTime = getTimeFromDate();

  return isToday(date) &&
    start <= currentTime &&
    currentTime <= end;
};

// Date => [weekStartDate, weekEndDate]
export const getStartEndWeek = date => {
  const dayInMs = 24 * 60 * 60 * 1000;
  const convertedDate = new Date(new Date(date).getTime() - dayInMs);

  const startDate = new Date(convertedDate.getTime() - (dayInMs * (convertedDate.getDay() - 1)));
  const endDate = new Date(convertedDate.getTime() + (dayInMs * (7 - convertedDate.getDay())));

  return [startDate.toLocaleDateString('en-US'), endDate.toLocaleDateString('en-US')];
};
