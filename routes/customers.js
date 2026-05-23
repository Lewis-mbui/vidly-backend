const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

const customerSchema = new mongoose.Schema({
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
});

const Customer = mongoose.model('Customer', customerSchema);

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  const {error} = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({...req.body})
  customer = await customer.save();
  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const {error} = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, {...req.body}, {
    returnDocument: 'after'
  });

  if (!updatedCustomer) res.status(404).send('Could not find customer with given id');

  res.send(updatedCustomer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer) res.status(404).send('Could not find customer with given id');

  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('Could not find customer with given id');

  res.send(customer);
});

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().pattern(/^[0-9]+$/).min(5).max(50).required(),
    isGold: Joi.boolean()
  }).required();

  return schema.validate(customer);
}

module.exports = router;