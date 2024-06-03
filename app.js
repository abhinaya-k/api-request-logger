const { performance } = require("perf_hooks");
const { logger } = require("./logger/log");
const { v4: uuidv4 } = require("uuid");

const apiLogger = (req, res, next) => {
  const startTime = performance.now();
  const requestId = processRequestId(req);
  const correlationId = processCorrelationId(req)

  const requestLogger = logger.child({ correlationId: correlationId })

  res.on("finish", () => {
    const endTime = performance.now();
    const latency = endTime - startTime;
    const logData = {
      requestUrl: req.protocol + "://" + req.get("host") + req.originalUrl,
      requestMethod: req.method,
      userAgent: req.header("user-agent"),
      xRequestId: req.header("x-request-id"),
      apiLatency: latency,
      time: new Date().toISOString(),
      reqBody: req.body,
      env: process.env.NODE_ENV,
      statusCode: res.statusCode,
      statusMessage: res.statusMessage
    };
    requestLogger.info("api_stats", logData)
  });

  next();
}
module.exports.apiLogger = apiLogger;

/**
 * @description generates `[X-request-id]` if not present in headers and appends it to the `req.headers` 
 * @param {object} req - express req instance
 */
const processRequestId = (req) => {
  if (!req.header('x-request-id')) {
    const requestId = uuidv4();
    req.headers['x-request-id'] = requestId;
    return requestId;
  } else {
    return req.header('x-request-id')
  }
}

const processCorrelationId = (req) => {
  if (!req.header('x-correlation-id')) {
    const correlationId = require("crypto").randomBytes(16).toString("hex");
    req.headers['x-correlation-id'] = correlationId;
    return correlationId;
  } else {
    return req.header('x-correlation-id')
  }
}
