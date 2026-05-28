const dotenv = require('dotenv');

module.exports = function() {
  dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
  });

  if (!process.env.JWT_PRIVATE_KEY) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
  }
}
