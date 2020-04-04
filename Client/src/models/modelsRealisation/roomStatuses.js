export default class RoomStatuses {
  static roomStatuses = ['NonActive', 'Active'];

  static getAsArray() {
    return this.roomStatuses;
  }

  static getValue(name) {
    return this.roomStatuses.indexOf(name);
  }

  static getName(value) {
    return this.roomStatuses[value];
  }
}
