require('dotenv').config();
const envVars = process.env;
// if test, use test database
const isTestEnvironment = envVars.NODE_ENV === 'test';
const config = {
  env: envVars.NODE_ENV,
  isDirectoryApplicationLogsEnabled:
    envVars.IS_DIR_APPLICATION_LOGS_ENABLED || false,
  port: envVars.PORT,
  apiVersion: envVars.API_VERSION,
  internalCommunicationKey: envVars.INTERNAL_COMMUNICATION_KEY,
  postgres: {
    db: isTestEnvironment ? envVars.POSTGRES_TEST_DB : envVars.POSTGRES_DB,
    port: envVars.POSTGRES_PORT,
    host: envVars.POSTGRES_HOST,
    user: envVars.POSTGRES_USER,
    password: envVars.POSTGRES_PASSWORD,
  },
  jwtSecret: envVars.JWT_SECRET,
  jwtTokenExpiryInHours: envVars.JWT_TOKEN_EXPIRY_IN_HOURS || 100,
  jwtAdminTokenExpiryInHours: envVars.JWT_ADMIN_TOKEN_EXPIRY_IN_HOURS || 5,
  maxApiLimit: envVars.MAX_API_ATTEMPTS,
  apiLimitAttemptsTime: envVars.API_LIMIT_PERIOD_SECONDS,
  postSize: process.env.POST_SIZE,
  postMaxUploadSize: process.env.POST_MAX_UPLOAD_SIZE,
};
module.exports = config;