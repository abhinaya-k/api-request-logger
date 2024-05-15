const { performance } = require("perf_hooks");
const chalk = require("chalk");
const { logger } = require("./logger/log");

const apiLogger = (req, res, next) => {
  const startTime = performance.now();
  processRequestId(req);

  res.on("finish", () => {
    const endTime = performance.now();
    const latency = endTime - startTime;
    const logData = {
      requestUrl: req.protocol + "://" + req.get("host") + req.originalUrl,
      requestMethod: req.method,
      userAgent: req.headers["user-agent"],
      xRequestId: req.headers["X-request-id"],
      apiLatency: latency,
      time: new Date().toISOString(),
      reqBody: req.body,
      env: process.env.NODE_ENV
    };
    logger.info("api_stats", logData)
  });

  next();
}
module.exports.apiLogger = apiLogger;

/**
 * @description generates `[X-request-id]` if not present in headers and appends it to the `req.headers` & log instance
 * @param {object} req - express req instance
 */
const processRequestId = (req) => {
  if (!req.headers["X-request-id"]) {
    const requestId = require("crypto").randomBytes(16).toString("hex");
    req.headers['X-request-id'] = requestId;
    logger.defaultMeta["requestId"] = requestId;
    return requestId;
  } else if (req.headers["X-request-id"]) {
    logger.defaultMeta["requestId"] = req.headers["X-request-id"];
  }
}
