/* eslint-disable object-property-newline */

const { Schema, model } = require('mongoose');

const mathSchema = new Schema({
  questionType: { type: Number, required: true },
  theme: { type: String, required: true },
  questionLevel: { type: Number, required: true },
  question: { type: String, required: true },
  src: String,
  answers: [String],
  rightAnswers: { type: [String], required: true },
  answerImage: String,
});

module.exports = model('math', mathSchema);
