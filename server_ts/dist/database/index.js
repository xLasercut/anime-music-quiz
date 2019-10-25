"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var config_1 = require("../shared/config");
var anime_1 = require("./anime");
var user_1 = require("./user");
var misc_1 = require("./misc");
var AMQDatabase = /** @class */ (function () {
    function AMQDatabase(logger) {
        this._logger = logger;
        this.loadDb();
    }
    AMQDatabase.prototype.loadDb = function () {
        this._songData = new anime_1.SongData(this._logger);
        this._emojiData = new misc_1.EmojiData(this._logger);
        this._generateUserDb();
    };
    AMQDatabase.prototype.addUserSong = function (user, songId) {
        this._songData.validateSongId(user, songId);
        this._userDatas[user].validateAddSongId(songId);
        this._userDatas[user].addSong(songId);
        this._logger.writeLog('DATA003', { songId: songId, user: user, changeType: 'add song' });
    };
    AMQDatabase.prototype.removeUserSong = function (user, songId) {
        this._userDatas[user].validateRemoveSongId(songId);
        this._userDatas[user].removeSong(songId);
        this._logger.writeLog('DATA003', { songId: songId, user: user, changeType: 'remove song' });
    };
    AMQDatabase.prototype.getUserList = function (user) {
        return this._userDatas[user].db;
    };
    AMQDatabase.prototype.addEmoji = function (emoji) {
        this._emojiData.addEmoji(emoji);
    };
    AMQDatabase.prototype.removeEmoji = function (emoji) {
        this._emojiData.removeEmoji(emoji);
    };
    Object.defineProperty(AMQDatabase.prototype, "songList", {
        get: function () {
            return this._songData.db;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AMQDatabase.prototype, "emojiList", {
        get: function () {
            return this._emojiData.db;
        },
        enumerable: true,
        configurable: true
    });
    AMQDatabase.prototype._generateUserDb = function () {
        this.users = this._getUsers();
        this._userDatas = {};
        for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var user = _a[_i];
            var userFilepath = this._getUserFilepath(user);
            this._userDatas[user] = new user_1.UserData(user, userFilepath, this._logger);
        }
    };
    AMQDatabase.prototype._getUserFilepath = function (user) {
        return path.join(config_1.USER_DATA_DIR, user + ".json");
    };
    AMQDatabase.prototype._getUsers = function () {
        var users = [];
        for (var _i = 0, _a = fs.readdirSync(config_1.USER_DATA_DIR); _i < _a.length; _i++) {
            var file = _a[_i];
            if (file.match(config_1.JSON_FILE_FORMAT)) {
                users.push(file.replace('.json', ''));
            }
        }
        return users;
    };
    return AMQDatabase;
}());
exports.AMQDatabase = AMQDatabase;
