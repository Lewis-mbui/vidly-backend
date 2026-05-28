const dotenv = require('dotenv');

module.exports = function() {
  const env = process.env.NODE_ENV || 'development';

  dotenv.config({
    path: `.env.${env}`
  });

  if (!process.env.JWT_PRIVATE_KEY) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined');
  }
}
