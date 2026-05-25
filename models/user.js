const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
    maxLength: 255
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 1024
  }
}));

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required()
  }).required();

  return schema.validate(user);
}

exports.validate = validateUser;
exports.User = User;