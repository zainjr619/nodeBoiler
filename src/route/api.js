const express = require('express');
const config = require('../common/config');
const userRouter = require('./user');

const router = express.Router();

const setRouter = (app) => {
  router.use(`/${config.apiVersion}/user`, userRouter);
  app.use('/api', router);

  app.get('/status', (req, res) => res.send('OK'));
  app.get('/version', (req, res) => res.json({ version: config.apiVersion }));
  app.get('/health', (req, res) => res.json({ mysql: 'OK', redis: 'OK' }));
};

module.exports = { setRouter };
