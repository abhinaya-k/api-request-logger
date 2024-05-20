const winston = require("winston");
const { colorizeLevel } = require("./helpers/colorizeLevels");
require("dotenv").config();
const { combine, timestamp, json, errors } = winston.format

const logger = winston.createLogger({
  /** initialize requestId */
  defaultMeta: { requestId: "" },
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorizeLevel(),
    timestamp(),
    json(),
    errors({ stack: true })
  ),
  transports: [new winston.transports.Console()],
});

module.exports.logger = logger;
