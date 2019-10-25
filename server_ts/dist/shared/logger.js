"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var winston = require("winston");
var DailyRotateFile = require("winston-daily-rotate-file");
var fs = require("fs");
var ini = require("ini");
var mustache = require("mustache");
var _a = winston.format, combine = _a.combine, timestamp = _a.timestamp, printf = _a.printf;
var logFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, timestamp = _a.timestamp;
    return timestamp + " | " + level + " | " + message;
});
var amqLog = new DailyRotateFile({
    frequency: '24h',
    filename: 'amq-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    dirname: config_1.LOG_DIR,
    maxFiles: '5',
    level: 'debug'
});
var logger = winston.createLogger({
    level: 'debug',
    format: combine(timestamp(), logFormat),
    transports: [
        amqLog,
        new winston.transports.Console({ level: 'debug' })
    ]
});
var AMQLogger = /** @class */ (function () {
    function AMQLogger() {
        this.config = ini.parse(fs.readFileSync(config_1.LOGBASE_PATH, { encoding: 'utf-8' }));
    }
    AMQLogger.prototype.writeLog = function (logReference, variables) {
        if (variables === void 0) { variables = {}; }
        var logConfig = this.config[logReference];
        if (logConfig) {
            var level = logConfig['Level'];
            var template = logConfig['Text'];
            if (!template) {
                this.writeLog('LOG004', { logReference: logReference, text: template });
            }
            else {
                var msg = mustache.render(template, variables);
                var logMsg = logReference + " | " + msg;
                if (level === 'INFO') {
                    logger.info(logMsg);
                }
                else if (level === 'WARN') {
                    logger.warn(logMsg);
                }
                else if (level === 'ERROR') {
                    logger.error(logMsg);
                }
                else if (level === 'DEBUG') {
                    logger.debug(logMsg);
                }
                else {
                    this.writeLog('LOG002', { logReference: logReference, level: level });
                }
            }
        }
        else {
            this.writeLog('LOG001', { logReference: logReference });
        }
    };
    return AMQLogger;
}());
exports.AMQLogger = AMQLogger;
