
const { Schema, model } = require('mongoose');

const answersSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
  src: String,
});

module.exports = model('initialLevelAnswers', answersSchema);