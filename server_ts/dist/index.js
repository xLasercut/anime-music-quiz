"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./shared/config");
var handlers_1 = require("./list/handlers");
var init_1 = require("./init");
var listHandler = new handlers_1.ListPickerHandler(init_1.logger, init_1.db, init_1.msgEmitter);
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
        listHandler.start(socket);
    }
    callback(socket['auth']);
}
init_1.io.on('connection', function (socket) {
    init_1.logger.writeLog('SERVER002', { id: socket.id });
    socket['admin'] = false;
    socket['auth'] = false;
    setTimeout(function () {
        if (!socket['auth']) {
            init_1.logger.writeLog('AUTH002', { id: socket.id });
            socket.disconnect(true);
        }
    }, 2000);
    socket.on('AUTHENTICATE', function (password, callback) {
        checkPassword(socket, password);
        startListeners(socket, callback);
    });
});
