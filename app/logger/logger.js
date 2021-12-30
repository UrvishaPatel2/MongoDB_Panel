const winston = require('winston');

module.exports.logger = winston.createLogger({
    transports:[
        new winston.transports.File({
            level:'info',
            filename:'logger.log',
            format:winston.format.combine(winston.format.timestamp())
        }),
        new winston.transports.File({
            level:'error',
            filename:'logger-error.log',
            format:winston.format.combine(winston.format.timestamp())
        }),
    ]
})