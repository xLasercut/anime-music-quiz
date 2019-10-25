"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var exceptions_1 = require("../shared/exceptions");
var abstracts_1 = require("../shared/abstracts");
var ListPickerHandler = /** @class */ (function (_super) {
    __extends(ListPickerHandler, _super);
    function ListPickerHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListPickerHandler.prototype.start = function (socket) {
        var _this = this;
        socket.on('LOGIN_LIST', exceptions_1.exceptionHandler(socket, function () {
            _this._emitter.syncUsers(socket);
        }));
        socket.on('SYNC_FULL_LIST', exceptions_1.exceptionHandler(socket, function () {
            _this._logger.writeLog('LIST002', { id: socket.id });
            _this._emitter.syncSongList(socket);
        }));
        socket.on('ADD_SONG', exceptions_1.exceptionHandler(socket, function (song, user) {
            var _a = _this._parseSong(song), anime = _a.anime, title = _a.title, songId = _a.songId;
            _this._logger.writeLog('LIST004', { id: socket.id,
                anime: anime,
                title: title,
                songId: songId,
                user: user });
            _this._db.addUserSong(user, songId);
            _this._emitter.syncUserList(user);
            _this._emitter.notification('success', anime + ": " + title + " added", socket);
        }));
        socket.on('REMOVE_SONG', exceptions_1.exceptionHandler(socket, function (song, user) {
            var _a = _this._parseSong(song), anime = _a.anime, title = _a.title, songId = _a.songId;
            _this._logger.writeLog('LIST004', { id: socket.id,
                anime: anime,
                title: title,
                songId: songId,
                user: user });
            _this._db.removeUserSong(user, songId);
            _this._emitter.syncUserList(user);
            _this._emitter.notification('success', anime + ": " + title + " removed", socket);
        }));
    };
    ListPickerHandler.prototype._parseSong = function (song) {
        var anime = song['anime'][0];
        var title = song['title'];
        var songId = song['songId'];
        return { anime: anime, title: title, songId: songId };
    };
    return ListPickerHandler;
}(abstracts_1.AbstractRequestHandler));
exports.ListPickerHandler = ListPickerHandler;
