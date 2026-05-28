const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  const db = process.env.db;
  mongoose.connect(db)
  .then(() => winston.info(`connected to ${db}...`));
}