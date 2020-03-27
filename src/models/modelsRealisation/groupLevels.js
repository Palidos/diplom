export default class GroupLevels {
    static groupLevels = [
      'PreIntermediate',
      'LowIntermediate',
      'Intermediate',
      'IntermediatePlus',
      'UpperIntermediate',
      'Advanced',
    ];

    static getAsArray() {
      return this.groupLevels;
    }

    static getValue(name) {
      return this.groupLevels.indexOf(name);
    }

    static getName(value) {
      return this.groupLevels[value];
    }
}
