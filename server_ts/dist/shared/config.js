"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var SERVER_PASSWORD = process.env.SERVER_PASSWORD || 'server';
exports.SERVER_PASSWORD = SERVER_PASSWORD;
var ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';
exports.ADMIN_PASSWORD = ADMIN_PASSWORD;
var SERVER_PORT = process.env.SERVER_PORT || 3001;
exports.SERVER_PORT = SERVER_PORT;
var LOG_DIR = path.join(__dirname, '../../log');
exports.LOG_DIR = LOG_DIR;
var DATA_DIR;
if (process.env.NODE_ENV === 'test') {
    DATA_DIR = path.join(__dirname, '../../test-data');
}
else {
    DATA_DIR = path.join(__dirname, '../../data');
}
var LOGBASE_PATH = path.join(DATA_DIR, 'logbase.cfg');
exports.LOGBASE_PATH = LOGBASE_PATH;
var USER_DATA_DIR = path.join(DATA_DIR, 'user');
exports.USER_DATA_DIR = USER_DATA_DIR;
var SONG_LIST_PATH = path.join(DATA_DIR, 'song-list.json');
exports.SONG_LIST_PATH = SONG_LIST_PATH;
var EMOJI_LIST_PATH = path.join(DATA_DIR, 'emoji.json');
exports.EMOJI_LIST_PATH = EMOJI_LIST_PATH;
var BOT_LIST_PATH = path.join(DATA_DIR, 'chat-bot.json');
exports.BOT_LIST_PATH = BOT_LIST_PATH;
var JSON_FILE_FORMAT = new RegExp('.*\.json', 'ig');
exports.JSON_FILE_FORMAT = JSON_FILE_FORMAT;
