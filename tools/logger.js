const appRoot = require('app-root-path');
const winston = require('winston');

const logger = winston.createLogger ({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: `${appRoot}/logs/error.log`, level: 'error' }),
    new winston.transports.File({ filename: `${appRoot}/logs/app.log` }),
  ],
  exitOnError: false,
  handleExceptions: true,
  maxsize: 10485760, // 10 MB
  maxFiles: 5
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
}

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()),
  }));
}


module.exports = logger;