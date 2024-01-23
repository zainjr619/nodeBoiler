const Sequelize = require('sequelize');
const config = require('./config');
const logger = require('./logger');

// connect to mysql
const sequelizeOptions = {
  dialect: 'postgres',
  port: config.postgres.port,
  host: config.postgres.host,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  ...(config.postgres.ssl && {
    ssl: config.postgres.ssl,
  }),
};

const sequelize = new Sequelize(
  config.postgres.db,
  config.postgres.user,
 config.postgres.password, 
  sequelizeOptions,
);

sequelize
  .authenticate()
  .then(() => {
    logger.info('Successfully established connection to database');
  })
  .catch((err) => {
    logger.error('Unable to connect to database', err);
  });

module.exports = sequelize;
