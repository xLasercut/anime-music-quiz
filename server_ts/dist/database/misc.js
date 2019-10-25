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
var config_1 = require("../shared/config");
var exceptions_1 = require("../shared/exceptions");
var EmojiData = /** @class */ (function (_super) {
    __extends(EmojiData, _super);
    function EmojiData(logger) {
        return _super.call(this, config_1.EMOJI_LIST_PATH, logger) || this;
    }
    EmojiData.prototype.addEmoji = function (emoji) {
        var _a = this._parseEmoji(emoji), command = _a.command, src = _a.src, emojiType = _a.emojiType;
        this._validateEmojiFields(command, src, emojiType);
        this._checkDuplicateEmoji(command, src, emojiType);
        this.db.push(emoji);
        this._writeFile();
        this._logger.writeLog('DATA004', { command: command,
            src: src,
            type: emojiType,
            changeType: 'add emoji' });
    };
    EmojiData.prototype.removeEmoji = function (emoji) {
        var _a = this._parseEmoji(emoji), command = _a.command, src = _a.src, emojiType = _a.emojiType;
        for (var i = 0; i < this.db.length; i++) {
            if (this.db[i]['command'].toLowerCase() === command.toLowerCase()) {
                this.db.splice(i, 1);
                this._writeFile();
                this._logger.writeLog('DATA004', { command: command,
                    src: src,
                    type: emojiType,
                    changeType: 'add emoji' });
                break;
            }
        }
    };
    EmojiData.prototype._validateEmojiFields = function (command, src, emojiType) {
        if (!command || !src || !emojiType) {
            this._logger.writeLog('DATA002', { command: command,
                src: src,
                type: emojiType,
                reason: 'invalid mandatory field' });
            throw new exceptions_1.AMQDbError('Invalid emoji field');
        }
    };
    EmojiData.prototype._checkDuplicateEmoji = function (command, src, emojiType) {
        for (var _i = 0, _a = this.db; _i < _a.length; _i++) {
            var emoji = _a[_i];
            var exisitingCommand = emoji['command'].toLowerCase();
            if (exisitingCommand === command.toLowerCase()) {
                this._logger.writeLog('DATA002', { command: command,
                    src: src,
                    type: emojiType,
                    reason: 'invalid mandatory field' });
                throw new exceptions_1.AMQDbError("Duplicate emoji command: " + command);
            }
        }
    };
    EmojiData.prototype._parseEmoji = function (emoji) {
        var command = emoji['command'];
        var src = emoji['src'];
        var emojiType = emoji['type'];
        return { command: command, src: src, emojiType: emojiType };
    };
    return EmojiData;
}(abstracts_1.AbstractDataObject));
exports.EmojiData = EmojiData;
