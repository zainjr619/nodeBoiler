const Sequelize = require('sequelize');
const sequelize = require('../common/sequelize');
const user= require ('./user')(sequelize, Sequelize);

// Doing manually to get ide intellisense
const db = {
  sequelize,
  user,
};

db.sequelize = sequelize;

module.exports = db;
