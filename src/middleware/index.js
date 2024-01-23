/**
 * Exporting all middlewares
 */
const validationMiddleware = require('./validation');
const authMiddleware = require('./auth');
const fileUploadMiddleware = require('./file-upload');
const rateLimit = require('./req-limit');

module.exports = {
  validationMiddleware,
  ...authMiddleware,
  rateLimit,
  fileUploadMiddleware,

};
