const winston = require('winston');
require('winston-mongodb');
require('dotenv').config();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();

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

if (!process.env.JWT_PRIVATE_KEY) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}






const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}...`);
})