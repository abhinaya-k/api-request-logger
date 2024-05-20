const winston = require("winston");
require("dotenv").config();
const { combine, timestamp, json, errors, colorize } = winston.format

const logger = winston.createLogger({
  /** initialize requestId */
  defaultMeta: { requestId: "" },
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    json(),
    errors({ stack: true })
  ),
  transports: [new winston.transports.Console({
    format: combine(
      colorize({all: true})
    )
  })],
});

module.exports.logger = logger;
