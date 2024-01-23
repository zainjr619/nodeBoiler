// Applicaton common response handler

const CustomError = require('./error');
const logger = require('../common/logger');

const responseHandler = (data) => {
  const {
    response, message, result, code = 200, errors = null, isSuccess = true,
  } = data;
  return response.status(code).json({
    code,
    errors,
    message,
    result,
    isSuccess,
  });
};

// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err, request, response, next) => {
  if (!(err instanceof CustomError)) {
    if (err instanceof Error) {
      err = new CustomError({
        message: err.message,
      });
    }
  }
  logger.log('error', 'login error ', { meta: { error: err.stack } });
  return responseHandler({
    response,
    message: err.message,
    result: null,
    code: err.code || 500,
    errors: [err],
    isSuccess: false,
  });
};

module.exports = {
  responseHandler,
  globalErrorHandler,
};
