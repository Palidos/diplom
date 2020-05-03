const { Schema, model } = require('mongoose');

const answersSchema = new Schema({
  id: Number,
  answerId: Number,
});

module.exports = model('answers', answersSchema);
