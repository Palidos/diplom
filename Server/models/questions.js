const { Schema, model } = require('mongoose');

const questionsSchema = new Schema({
  _id: Number,
  question: {
    type: String,
    required: true,
  },
  answers: [String],
});

module.exports = model('questions', questionsSchema);
