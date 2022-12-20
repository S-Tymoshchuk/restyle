// import winston, { format, transports } from 'winston';
//
// export class LoggerConfig {
//   private readonly options: winston.LoggerOptions;
//
//   constructor() {
//     this.options = {
//       exitOnError: false,
//       format: format.combine(
//         format.colorize({ all: true }),
//         format.timestamp(),
//         format.printf(({ level, message, timestamp, ...metadata }) => {
//           let msg = `${timestamp} [${level}] : ${message} `;
//           if (metadata) {
//             msg += JSON.stringify(metadata);
//           }
//           return msg;
//         }),
//       ),
//       transports: [new transports.Console({ level: 'debug' })], // alert > error > warning > notice > info > debug
//     };
//   }
//
//   public console(): object {
//     return this.options;
//   }
// }
