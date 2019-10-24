"use strict";
exports.__esModule = true;
var express = require("express");
var socketio = require("socket.io");
var config_1 = require("./src/shared/config");
var logger_1 = require("./src/shared/logging/logger");
var index_1 = require("./src/database/index");
var logger = new logger_1.AMQLogger();
var db = new index_1.AMQDatabase(logger);
var app = express();
var server = app.listen(config_1.SERVER_PORT, function () {
    logger.writeLog('SERVER001', { port: config_1.SERVER_PORT });
});
var io = socketio(server);
function checkPassword(socket, password) {
    if (password === config_1.SERVER_PASSWORD || password === config_1.ADMIN_PASSWORD) {
        socket['auth'] = true;
    }
    if (password === config_1.ADMIN_PASSWORD) {
        socket['admin'] = true;
    }
}
function startListeners(socket, callback) {
    if (socket['auth']) {
        console.log('test');
    }
    callback(socket['auth']);
}
io.on('connection', function (socket) {
    logger.writeLog('SERVER002', { id: socket.id });
    socket['admin'] = false;
    socket['auth'] = false;
    setTimeout(function () {
        if (!socket['auth']) {
            logger.writeLog('AUTH002', { id: socket.id });
            socket.disconnect(true);
        }
    }, 2000);
    socket.on('AUTHENTICATE', function (password, callback) {
        checkPassword(socket, password);
        startListeners(socket, callback);
    });
});
