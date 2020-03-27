export default class GroupStatuses {
  static groupStatuses = ['NonActive', 'Active'];

  static getAsArray() {
    return this.groupStatuses;
  }

  static getValue(name) {
    return this.groupStatuses.indexOf(name);
  }

  static getName(value) {
    return this.groupStatuses[value];
  }
}
