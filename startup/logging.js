const winston = require('winston');
require('winston-mongodb');

module.exports = function() {
  winston.exceptions.handle(
    new winston.transports.File({filename: 'uncaughtExceptions.log'}),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      )
    })
  );

  winston.rejections.handle(
    new winston.transports.File({filename: 'unhandledRejections.log'}),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  );

  winston.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));

  winston.add(new winston.transports.File({
    filename: 'logfile.log',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    )
  }));

  winston.add(new winston.transports.MongoDB({
    db: 'mongodb://127.0.0.1/vidly',
    level: 'info'
  }));
}