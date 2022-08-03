"use strict";
const winston = require('winston');
const fs = require("fs");
const config = require("../../bin/config");
const logDir = config.logDir;

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleString("en-US", { timeZone: "America/New_York" });

let winstonLogger = winston.createLogger({
    transports: [
        new (require('winston-daily-rotate-file'))({
            filename: logDir + 'cbci_err_%DATE%.log',
            handleExceptions: true,
            timestamp: tsFormat,
            datePattern: 'YYYY-MM-DD',
            prepend: false,
            //zippedArchive: true,
            //maxSize: '20m',
            //maxFiles: '10d'
        })
    ],
    exitOnError: false
});

let winstonReqLogger = winston.createLogger({
    transports: [
        new (require('winston-daily-rotate-file'))({
            level: "info",
            filename: logDir + 'cbci_req_%DATE%.log',
            handleExceptions: true,
            timestamp: tsFormat,
            datePattern: 'YYYY-MM-DD',
            prepend: false,
            //zippedArchive: true,
            //maxSize: '20m',
            //maxFiles: '10d'
        })
    ],
    exitOnError: false
});

module.exports = { winstonLogger, winstonReqLogger };
