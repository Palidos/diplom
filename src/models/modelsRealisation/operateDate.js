export default class OperateDate {
  static constructDateString(date) {
    if (date) {
      return `${date.getFullYear()
      }${((date.getMonth() + 1) < 10)
        ? (`0${date.getMonth() + 1}`)
        : (date.getMonth() + 1)}${(date.getDate() < 10)
        ? (`0${date.getDate()}`)
        : date.getDate()}`;
    }
    return '';
  }

  static parseDateString(dateString) {
    try {
      return dateString && dateString.length === 8
        ? new Date(`${dateString.slice(0, 4)}-${dateString.slice(4, 6)}-${dateString.slice(6)}`)
        : new Date();
    } catch (err) {
      return new Date();
    }
  }

  static addDays(date, days) {
    return new Date(date.getTime() + 1000 * 60 * 60 * 24 * days);
  }
}
