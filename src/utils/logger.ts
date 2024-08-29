import winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message }) =>
        `[${new Date(timestamp).toLocaleString()} | ${level}]: ${message}`,
    ),
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
