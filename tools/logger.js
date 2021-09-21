const appRoot = require('app-root-path');
const winston = require('winston');

const logger = winston.createLogger ({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp( { format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf( ( { level, message, timestamp }) => {
      return `[ ${level} | ${timestamp} | ${message.trim()} ]`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: `${appRoot}/logs/error.log`, level: 'error' }),
    new winston.transports.File({ filename: `${appRoot}/logs/app.log`, colorize: false })
  ],

  exitOnError: false,
  handleExceptions: true,
  maxsize: 10485760, // 10 MB
  maxFiles: 5
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize())
  }));
}

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  }
}


module.exports = logger;