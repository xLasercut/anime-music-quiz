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
var abstracts_1 = require("../shared/abstracts");
var exceptions_1 = require("../shared/exceptions");
var EmojiHandler = /** @class */ (function (_super) {
    __extends(EmojiHandler, _super);
    function EmojiHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmojiHandler.prototype.start = function (socket) {
        var _this = this;
        socket.on('LOGIN_MISC', exceptions_1.exceptionHandler(socket, function () {
            _this._emitter.syncEmojiData(socket);
        }));
        socket.on('SYNC_EMOJI_DATA', exceptions_1.exceptionHandler(socket, function () {
            _this._emitter.syncEmojiData(socket);
        }));
        socket.on('ADD_EMOJI', exceptions_1.exceptionHandler(socket, function (emoji) {
            var command = emoji['command'];
            _this._logger.writeLog('EMOJI001', { command: command,
                src: emoji['src'],
                type: emoji['type'] });
            _this._db.addEmoji(emoji);
            _this._emitter.syncEmojiData();
            _this._emitter.notification('success', "emoji :" + command + ": added", socket);
        }));
        socket.on('REMOVE_EMOJI', exceptions_1.exceptionHandler(socket, function (emoji) {
            var command = emoji['command'];
            _this._logger.writeLog('EMOJI002', { command: command,
                src: emoji['src'],
                type: emoji['type'] });
            _this._db.removeEmoji(emoji);
            _this._emitter.syncEmojiData();
            _this._emitter.notification('success', "emoji :" + command + ": removed", socket);
        }));
    };
    return EmojiHandler;
}(abstracts_1.AbstractRequestHandler));
exports.EmojiHandler = EmojiHandler;
