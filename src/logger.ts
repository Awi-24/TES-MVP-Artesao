import { createLogger, format, transports, addColors } from 'winston';

const customLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
};

const customColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
};

const logger = createLogger({
  levels: customLevels,
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ colors: customColors }),
        format.simple()
      ),
      level: 'debug' // Ensure console logs all levels in dev
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log', level: 'info' })
  ],
});

// Add colors to Winston
addColors(customColors);

export default logger;

