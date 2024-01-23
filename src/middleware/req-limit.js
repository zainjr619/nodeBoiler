const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many attempts from this user, please try again after 15 minutes',
});

module.exports = {
  apiLimiter,
};
