const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
];

export default class DaysOfWeek {
  static getAsArray() {
    return daysOfWeek;
  }

  static getValue(name) {
    return daysOfWeek.indexOf(name) + 1;
  }

  static getName(value) {
    return daysOfWeek[value - 1];
  }
}
