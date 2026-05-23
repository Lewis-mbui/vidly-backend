const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50
  }
}));

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(20)
  }).required();

  return schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenre;