const http = require('http');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const compression = require('compression');
const config = require('./common/config');
const swaggerDocument = require('./swagger.json');
const { setRouter } = require('./route/api');
const logger = require('./common/logger');
const { replaceErrors } = require('./common/utils');

// Global Error Handler
const { globalErrorHandler } = require('./utils/response');

process.on('unhandledRejection', (err) => {
  logger.error(
    `Unhandled Rejection Details::${JSON.stringify(err, replaceErrors)}`,
  );
});

process.on('uncaughtException', (err) => {
  logger.error(
    `Uncaught Exception Details::${JSON.stringify(err, replaceErrors)}`,
  );
});

const app = express();
app.server = http.createServer(app);

app.use(morgan('combined', { stream: logger.stream }));

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(
  bodyParser.json({
    limit: '2000kb',
  }),
);

app.use(compression());

app.disable('x-powered-by');

// cors
app.use(cors());
// swagger ui
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

setRouter(app);

// Added Global Error handler as middleware
app.use((err, req, res, next) => globalErrorHandler(err, req, res, next));

app.server.listen(config.port, () => {
  logger.info(
    `Started server on => http://localhost:${app.server.address().port}`,
  );
  logger.info(
    `Docs available on => http://localhost:${
      app.server.address().port
    }/api-docs`,
  );
});

module.exports = { app };
