const Joi = require('joi');
// const { resetUserPassword } = require('../validations');

const validationMiddleware = (validationObject, isGet = false) => (req, res, next) => {
  let body;
  if(Object.keys(req.query).length>0){
     body = req.query ? req.query : isGet;
  }else{
    body = req.body ? req.body : isGet;
  }
  const { error } = Joi.validate(body, validationObject);
  if (error) {
    return res
      .status(401)
      .send({ code: 401, message: error.message });
  }
  return next();
};


module.exports = validationMiddleware;
