export default class EditGroupModel {
  constructor(
    roomId1,
    level = 0,
    dayOfWeek1 = 1,
    timeHours1 = 9,
    timeMinutes1 = 0,
    duration1 = '01:00:00',
  ) {
    this.roomId1 = roomId1;
    this.level = level;
    this.dayOfWeek1 = dayOfWeek1;
    this.timeHours1 = timeHours1;
    this.timeMinutes1 = timeMinutes1;
    this.duration1 = this.parseDuration(duration1);
  }

  parseDuration(string) {
    const minValues = [
      60,
      1,
      1 / 60,
    ];
    const num = string
      .split(':')
      .reduce((acc, cur, i) => acc + (cur * minValues[i]), 0);

    return num;
  }

  static createFromGroup(group) {
    return new EditGroupModel(
      group.room1.id,
      group.level,
      group.dayOfWeek1,
      new Date(group.time1).getHours(),
      new Date(group.time1).getMinutes(),
      group.duration1,
    );
  }
}
