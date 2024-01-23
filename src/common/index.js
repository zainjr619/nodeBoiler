/**
 * Exporting all common files
 */
const config = require('./config');
// const fileUploader = require('./file-uploader');
const logger = require('./logger');
const Utils = require('./utils');
// const OtpCommon = require('./otp');
// const EmailSender = require('./email-sender');
const S3Uploader = require('./file-uploader');
const http = require('./http')

module.exports = {
  config,
  logger,
  Utils,
  S3Uploader,
  http
};
