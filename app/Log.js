const Moment = require('moment');
const Config = require('./config');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, printf } = format;

class Logger {

  constructor() {
    this.engine = createLogger({
      level: Config.logging,
      format: combine(
        colorize(),
        timestamp(),
        printf(({ level, message, service, timestamp }) => {
          return `[${Moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}][${service}][${level}] ${message}`;
        })
      ),
      defaultMeta: { service: 'user-service' },
      transports: [
        new transports.Console(),
      ]
    });
  }

  log(level, service, message) {
    return this.engine.log(level, message, {
      service,
    })
  }

  error(service, message) {
    return this.log('error', service, message);
  }

  warn(service, message) {
    return this.log('warn', service, message);
  }

  info(service, message) {
    return this.log('info', service, message);
  }

  verbose(service, message) {
    return this.log('verbose', service, message);
  }

  debug(service, message) {
    return this.log('debug', service, message);
  }

  silly(service, message) {
    return this.log('silly', service, message);
  }

}

module.exports = new Logger();
