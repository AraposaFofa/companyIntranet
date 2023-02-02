/**
 * CONFIGURAÇÃO DO LOGGER PARA PEGAR IP E TUDO QUE ACONTECE NA APLICAÇÃO
 */

const appRootPath = require("app-root-path");
const winston = require("winston");
require('winston-daily-rotate-file')

/**
 * LOG OPTIONS ###################################################################################
 */
const logOptions = {
    file: {
        level: "info",
        filename: `${appRootPath}/logs/info.log`,
        handleExceptions: true,
        maxSize: 5242880,
        maxFiles: '14d',
        format: winston.format.combine(
            winston.format.label({ label: `server🏷️`}),
            winston.format.timestamp({ format: "DD-MM-YYYY"}),
            winston.format.simple()
        ),
    },
    console: {
        level: "debug",
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.label({ label: `server🏷️`}),
            winston.format.timestamp({ format: "DD-MM-YYYY"}),
            winston.format.simple()
        ),
    },
}
/**
 * EMAIl OPTIONS ###################################################################################
 */

const emailOtions = {
    file: {
        level: "info",
        filename: `${appRootPath}/logs/email/email.log`,
        handleExceptions: true,
        maxSize: 5242880,
        maxFiles: '14d',
        format: winston.format.combine(
            winston.format.label({ label: `email🏷️`}),
            winston.format.timestamp({ format: "DD-MM-YYYY"}),
            winston.format.simple()
        ),
    },
    console: {
        level: "debug",
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.label({ label: `email🏷️`}),
            winston.format.timestamp({ format: "DD-MM-YYYY"}),
            winston.format.simple(),
        ),
    },
}
/**
 * LOG ROTATION ###################################################################################
 */

const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: `${appRootPath}/logs/info-%DATE%.log`,
    datePattern: "DD-MM-YYYY",
    maxFiles: "14d",
    format: winston.format.combine(
        winston.format.label({ label: `server🏷️`}),
        winston.format.timestamp({ format: "DD-MM-YYYY"}),
        winston.format.simple()
    )
})

/**
 * EMAIL ROTATION ###################################################################################
 */

const fileRotateTransportEmail = new winston.transports.DailyRotateFile({
    filename: `${appRootPath}/logs/email/email-%DATE%.log`,
    datePattern: "DD-MM-YYYY",
    maxFiles: "14d",
    format: winston.format.combine(
        winston.format.label({ label: `email🏷️`}),
        winston.format.timestamp({ format: "DD-MM-YYYY"}),
        winston.format.simple()
    )
})

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(logOptions.file),
        new winston.transports.Console(logOptions.console),
        fileRotateTransport,   
    ],
    exitOnError: false // NAO SAIR QUANDO APARECER ERROS
})

const email = winston.createLogger({
    transports: [
        new winston.transports.File(emailOtions.file),
        new winston.transports.Console(emailOtions.console),
        fileRotateTransportEmail,   
    ],
    exitOnError: false // NAO SAIR QUANDO APARECER ERROS
})

logger.stream = {
    write: function(message, encoding) {
        logger.info(message)
    }
}
email.stream = {
    write: function(message, encoding){
        email.info(message)
    }
}

module.exports = {
    logger: logger,
    email: email
}