const winston = require('winston');
require('winston-mongodb');
require('dotenv').config();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

require('./routes/auth');
const express = require('express');
const app = express();
require('./startup/routes')(app);

winston.exceptions.handle(new winston.transports.File({filename: 'uncaughtExceptions.log'}));
winston.rejections.handle(new winston.transports.File({filename: 'unhandledRejections.log'}));


winston.add(new winston.transports.File({
  filename: 'logfile.log',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
})
);

winston.add(new winston.transports.MongoDB({
  db: 'mongodb://127.0.0.1/vidly',
  level: 'info'
}));

// throw new Error('Something failed during startup.');

const p = Promise.reject(new Error('Something failed miserably!!'));
p.then(() => console.log('Done'));

if (!process.env.JWT_PRIVATE_KEY) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}

mongoose.connect('mongodb://127.0.0.1/vidly')
  .then(() => console.log('connected to MongoDb...'))
  .catch(err => console.error('Could not connect to MongoDB'));




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}...`);
})