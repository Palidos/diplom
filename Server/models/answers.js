const { Schema, model } = require('mongoose');

const answersSchema = new Schema({
  _id: Number,
  answerId: {
    type: Number,
    min: 0,
    max: 3,
  },
});

module.exports = model('answers', answersSchema);
