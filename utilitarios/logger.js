const appRootPath = require("app-root-path");
const winston = require("winston");
require('winston-daily-rotate-file')

const logOptions = {
    file: {
        level: "info",
        filename: `${appRootPath}/logs/info.log`,
        handleExceptions: true,
        maxSize: 5242880,
        maxFiles: '14d',
        format: winston.format.combine(
            winston.format.label({ label: `server🏷️`}),
            winston.format.timestamp({ format: "YYYY-MM-DD"}),
            winston.format.simple()
        ),
    },
    console: {
        level: "debug",
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.label({ label: `server🏷️`}),
            winston.format.timestamp({ format: "YYYY-MM-DD"}),
            winston.format.simple()
        ),
    },
}
const emailOtions = {
    file: {
        level: "info",
        filename: `${appRootPath}/logs/email/email.log`,
        handleExceptions: true,
        maxSize: 5242880,
        maxFiles: '14d',
        format: winston.format.combine(
            winston.format.label({ label: `email🏷️`}),
            winston.format.timestamp({ format: "YYYY-MM-DD"}),
            winston.format.simple()
        ),
    },
    console: {
        level: "debug",
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.label({ label: `email🏷️`}),
            winston.format.timestamp({ format: "YYYY-MM-DD"}),
            winston.format.simple(),
        ),
    },
}
const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: `${appRootPath}/logs/info-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    maxFiles: "14d",                                     
    format: winston.format.combine(
        winston.format.label({ label: `server🏷️`}),
        winston.format.timestamp({ format: "YYYY-MM-DD"}),
        winston.format.simple()
    )
})
const fileRotateTransportEmail = new winston.transports.DailyRotateFile({
    filename: `${appRootPath}/logs/email/email-%DATE%.log`,
    datePattern: "YYYY-MM-DD",
    maxFiles: "14d",
    format: winston.format.combine(
        winston.format.label({ label: `email🏷️`}),
        winston.format.timestamp({ format: "YYYY-MM-DD"}),
        winston.format.simple()
    )
})
const logger = winston.createLogger({
    transports: [
        new winston.transports.File(logOptions.file),
        new winston.transports.Console(logOptions.console),
        // fileRotateTransport,                                        // ATIVE ESSA LINHA PARA INICIALIZAR A ROTACAO DE LOG !!!!!!!!!!
    ],
    exitOnError: false 
})
const email = winston.createLogger({
    transports: [
        new winston.transports.File(emailOtions.file),
        new winston.transports.Console(emailOtions.console),
        fileRotateTransportEmail,   
    ],
    exitOnError: false 
})
logger.stream = {
    write: function(message, encoding) {
        console.log('logado!')
        logger.info(message)
    }
}
email.stream = {
    write: function(message, encoding){
        console.log('email logado!')
        email.info(message)
    }
}
module.exports = {
    logger: logger,
    email: email
}