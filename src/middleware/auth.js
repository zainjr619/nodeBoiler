const { AuthService } = require('../service');
const logger = require('../common/logger');
const CustomError = require('../utils/error');
const { ERROR_CODES } = require('../constant');

// eslint-disable-next-line consistent-return
const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new CustomError(ERROR_CODES.AUTH_TOKEN_NOT_FOUND);
    }

    const tokens = req.headers.authorization.split(' ');

    if (
      tokens
      && tokens.length > 0
      && tokens[0] === 'Bearer'
      && tokens[1]
      && tokens[1] !== 'null'
    ) {
      this.verify(tokens[1], (err, user) => {
        if (err) {
          return res.status(err.code).send(err);
        }
        req.loggedUser = user;
        return next();
      });
    } else {
      return res
        .status(401)
        .send({ code: 401, message: 'Authorization header is required' });
    }
  } catch (error) {
    logger.log('error', 'policy list error ', { meta: { error: error.stack } });
    next(error);
  }
};

module.exports = {
  authMiddleware,
};
