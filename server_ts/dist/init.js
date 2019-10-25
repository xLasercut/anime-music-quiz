"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var socketio = require("socket.io");
var logger_1 = require("./shared/logger");
var database_1 = require("./database");
var config_1 = require("./shared/config");
var handlers_1 = require("./shared/handlers");
var logger = new logger_1.AMQLogger();
exports.logger = logger;
var db = new database_1.AMQDatabase(logger);
exports.db = db;
var app = express();
var server = app.listen(config_1.SERVER_PORT, function () {
    logger.writeLog('SERVER001', { port: config_1.SERVER_PORT });
});
var io = socketio(server);
exports.io = io;
var msgEmitter = new handlers_1.MessageEmitter(io, db);
exports.msgEmitter = msgEmitter;
