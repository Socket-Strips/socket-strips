import chalk from "chalk";
import { createLogger, format, transports } from "winston";

const formatLevel = (level: string) => {
  let formattedLevel = "";

  switch (level) {
    case "INFO":
      formattedLevel = chalk.cyan(level);
      break;

    case "WARN":
      formattedLevel = chalk.yellow(level);
      break;

    case "ERROR":
      formattedLevel = chalk.red(level);
      break;

    default:
      break;
  }

  return formattedLevel;
};

const myFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${formatLevel(level.toUpperCase())}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), myFormat),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
    new transports.Console(),
  ],
});

export default logger;
