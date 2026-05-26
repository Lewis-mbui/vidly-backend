// Executed after the auth middleware
// therefore we have req.user
module.exports = function(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send('Access denied');

  next(); // next MW --> route handler
}