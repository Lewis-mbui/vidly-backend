const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]+$/,
    minLength: 5,
    maxLength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  }
}));

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().pattern(/^[0-9]+$/).min(5).max(50).required(),
    isGold: Joi.boolean()
  }).required();

  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;