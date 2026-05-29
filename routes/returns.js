const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
  res.status(401).send('unauthorized');
});

module.exports = router;