const { Schema, model } = require('mongoose');

const initialLevelSchema = new Schema({
  questionType: {
    type: Number,
    required: true,
  },

  theme: {
    type: String,
    required: true,
  },

  inlineImage: [String],

  question: {
    type: String,
    required: true,
  },

  src: String,
  mainContent: String,

  answers: [String],
});

module.exports = model('initialLevel', initialLevelSchema);
