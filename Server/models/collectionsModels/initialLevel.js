/* eslint-disable object-property-newline */

const { Schema, model } = require('mongoose');

const questionsSchema = new Schema({
  questionType: { type: Number, required: true },
  theme: { type: String, required: true },
  questionLevel: { type: Number, required: true },
  question: { type: String, required: true },
  src: String,
  answers: [String],
});

module.exports = model('initialLevel', questionsSchema);
