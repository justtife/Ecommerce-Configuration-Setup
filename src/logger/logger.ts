import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf, metadata, colorize } = format;
import path from "path";

//Logger output Format for file(error messages)
const logFormat = (serviceName: string) =>
  printf(({ level, label, timestamp, message, ...meta }) => {
    return `[${level}] ${timestamp} ${label} [${serviceName}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta) : ""
    }`;
  });
//Logger output Format for console(info,warn,error messages)
const consoleFormat = (serviceName: string) =>
  printf(({ level, label, timestamp, message }) => {
    return `[${level}] ${timestamp} ${label} [${serviceName}]: ${message}`;
  });
const logger = (serviceName: string) => {
  return createLogger({
    transports: [
      //Console - Log all level
      new transports.Console({
        format: combine(
          colorize({ all: <boolean>false, level: <boolean>true }),
          consoleFormat(serviceName)
        ),
      }),
      //File - Log error
      new transports.File({
        level: "error" as string,
        filename: path.join(__dirname, `${serviceName}-logger.log`) as string,
        format: logFormat(serviceName),
      }),
    ],
    format: combine(
      label({ label: "Scissors-Logger" }),
      timestamp({ format: "YY-MM-DD HH:mm:ss" }),
      metadata({ fillExcept: ["message", "level", "timestamp", "label"] }),
      logFormat(serviceName)
    ),
  });
};

export default logger;
