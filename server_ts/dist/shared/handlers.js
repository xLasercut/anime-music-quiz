"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var init_1 = require("../init");
var MessageEmitter = /** @class */ (function () {
    function MessageEmitter(io, db) {
        this._io = io;
        this._db = db;
    }
    MessageEmitter.prototype.notification = function (msgType, msg, socket) {
        if (socket === void 0) { socket = null; }
        this._emitter(socket).emit('SYSTEM_NOTIFICATION', msgType, msg);
    };
    MessageEmitter.prototype.syncSongList = function (socket) {
        if (socket === void 0) { socket = null; }
        this._emitter(socket).emit('SYNC_FULL_LIST', this._db.songList);
    };
    MessageEmitter.prototype.syncUsers = function (socket) {
        if (socket === void 0) { socket = null; }
        this._emitter(socket).emit('SYNC_USER_LIST_FILES', this._db.users);
    };
    MessageEmitter.prototype.syncUserList = function (user, socket) {
        if (socket === void 0) { socket = null; }
        var data = {
            list: init_1.db.getUserList(user),
            file: user
        };
        this._emitter(socket).emit('SYNC_USER_LIST', data);
    };
    MessageEmitter.prototype.syncEmojiData = function (socket) {
        if (socket === void 0) { socket = null; }
        this._emitter(socket).emit('SYNC_EMOJI_DATA', this._db.emojiList);
    };
    MessageEmitter.prototype._emitter = function (socket) {
        if (socket === void 0) { socket = null; }
        if (socket) {
            return socket;
        }
        return this._io;
    };
    return MessageEmitter;
}());
exports.MessageEmitter = MessageEmitter;
