/* eslint-disable object-property-newline */

const { Schema, model } = require('mongoose');

const questionsSchema = new Schema({
  testName: { type: String, required: true },
  questionType: { type: Number, required: true },
  theme: { type: String, required: true },
  questionLevel: { type: Number, required: true },
  question: { type: String, required: true },
  src: String,
  answers: [String],
  rightAnswers: { type: [String], required: true },
  answerImage: String,
});

module.exports = model('questions', questionsSchema);
