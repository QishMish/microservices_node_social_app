// const winston = require("winston");

// const options = {
//   file: {
//     level: "info",
//     filename: "./logs.txt",
//     handleExceptions: true,
//     json: true,
//     maxsize: 5242880,
//     maxFiles: 5,
//     colorize: false,
//   },
//   console: {
//     level: "debug",
//     handleExceptions: true,
//     json: false,
//     colorize: true,
//   },
// };

// const logger = winston.createLogger({
//   levels: winston.config.npm.levels,
//   transports: [
//     new winston.transports.File(options.file),
//     new winston.transports.Console(options.console),
//   ],
//   exitOnError: false,
// });

// export default logger

import winston from 'winston'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/logs.txt',
    level: 'error',
  }),
  new winston.transports.File({ filename: '../../logs/logs.txt' }),
]

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

export default Logger