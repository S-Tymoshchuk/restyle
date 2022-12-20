import * as winston from 'winston';
import { transports } from 'winston';
import { WinstonModuleOptions } from 'nest-winston';

export default function loggerConfig(): WinstonModuleOptions {
  const env: string = process.env.NODE_ENV || 'development';
  return transportConfig(env);
}

function transportConfig(env: string): WinstonModuleOptions {
  if (env === 'development') {
    return devTransport();
  } else {
    return prodTransport();
  }
}

function devTransport(): WinstonModuleOptions {
  return {
    exitOnError: false,
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp, ...metadata }) => {
        let msg = `${timestamp} [${level}] : ${message} `;
        if (metadata) {
          msg += JSON.stringify(metadata);
        }
        return msg;
      }),
    ),
    transports: [new transports.Console({ level: 'debug' })], // alert > error > warning > notice > info > debug
  };
}

function prodTransport(): WinstonModuleOptions {
  return {
    exitOnError: false,
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp, ...metadata }) => {
        let msg = `${timestamp} [${level}] : ${message} `;
        if (metadata) {
          msg += JSON.stringify(metadata);
        }
        return msg;
      }),
    ),
    transports: [new transports.Console({ level: 'info' })],
  };
}
