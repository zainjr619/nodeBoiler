const Joi = require('joi');

module.exports.registerUser = Joi.object({
    user_id:Joi.number().required(),
    country_code : Joi.string().required(),
    username : Joi.string().required(),
  });