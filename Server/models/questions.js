const { Schema, model } = require('mongoose');

const questionsSchema = new Schema({
  id: Number,
  questionType: {
    type: Number,
    required: true,
  },
  inlineImage: [String],
  src: String,
  question: {
    type: String,
    required: true,
  },
  answers: [String],
});

module.exports = model('questions', questionsSchema);
