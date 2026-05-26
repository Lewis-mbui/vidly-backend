const auth = require('../middleware/auth');
const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', auth, async (req, res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({...req.body})
  await customer.save();
  res.send(customer);
});

router.put('/:id', auth, async (req, res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, {...req.body}, {
    returnDocument: 'after'
  });

  if (!updatedCustomer) res.status(404).send('Could not find customer with given id');

  res.send(updatedCustomer);
});

router.delete('/:id', auth, async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer) res.status(404).send('Could not find customer with given id');

  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('Could not find customer with given id');

  res.send(customer);
});

module.exports = router;