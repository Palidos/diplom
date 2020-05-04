const { Schema, model } = require('mongoose');

const answersSchema = new Schema({
  questionId: Number,
  answers: [String],
});

module.exports = model('answers', answersSchema);
