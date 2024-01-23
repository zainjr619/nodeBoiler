/* eslint-disable consistent-return */
const { UserService } = require('../service');
const { SUCCESS_CODES } = require('../constant');

const { responseHandler } = require('../utils/response');

class UserController {
  static async registerUser(req, res, next) {
    try {
      const result = await UserService.registerUser(req);
      return responseHandler({
        response: res,
        ...SUCCESS_CODES.SOME,
        result,
        isSuccess: true,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
