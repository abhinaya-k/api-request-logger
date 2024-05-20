# api-request-logger

`maintainer: Rishu Shrivastav (rish15)`

## Introduction

### The why ?

So we wanted to track every request that comes to the server with some metadata such as userAgent, reqBody, apiPath, apiLatency so I put together a simple minimilistic middleware which can be injected in one liner and start giving data to be analysed.
Adding to that it also provides a wrapper over winston library for logging, helping in generting formatted logs and requestId associated with the log statemenet.

## Getting started

#### 1. Installation

`npm i api-request-logger`

## Usage

```javascript 
const { apiLogger } = require("api-request-logger");`
app.use(apiLogger)` // add this line before the routes in the entry file
```


Logging format 

```json
{
  "requestUrl": "http://localhost:2000/serviceName/v1/users/list",
  "requestMethod": "GET",
  "userAgent": "PostmanRuntime/7.28.4",
  "xRequestId": "f584d507e38a9f3a2e88b02e7ab7e81b",
  "apiLatency": 51.71452800184488,
  "time": "2023-06-09T05:54:45.901Z",
  "reqBody": {},
  "env": "local",
  "msg": "api_stats"
}
```

### Logging 
the log is just a wrapper over the Winston library, it formats the logs in [level] [timestamp] [requestId] [logs] it appends the requestId to every log statement.
##### Import the module 
`const { logger } = require("api-request-logger");`

Example 
```javascript 
logger.info("This is an info");
logger.warn("This is a warning");
logger.error("This is an error");
```

##### changing log level 
For detailed log level priorities refer this [winston log levels](https://github.com/winstonjs/winston#logging-levels)

In the .env file or any configuration file that your app uses, export an env variable LOG_LEVEL=level where the level is the log levels supported by Winston. By default log level is set to ```info``` 
```.env 
LOG_LEVEL=debug
```



