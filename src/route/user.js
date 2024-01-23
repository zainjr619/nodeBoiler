const express = require('express');
const { UserController } = require('../controller');

const userRouter = express.Router();
const { validationMiddleware, } = require('../middleware');
const { userValdations } = require('../validations');

userRouter.post('/register', validationMiddleware(userValdations.registerUser), UserController.registerUser);


module.exports = userRouter;
