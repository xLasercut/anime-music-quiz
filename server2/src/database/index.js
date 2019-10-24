"use strict";
exports.__esModule = true;
var anime_1 = require("./anime");
var AMQDatabase = /** @class */ (function () {
    function AMQDatabase(logger) {
        this._logger = logger;
        this.loadDb();
    }
    AMQDatabase.prototype.loadDb = function () {
        this._songData = new anime_1.SongData(this._logger);
    };
    return AMQDatabase;
}());
exports.AMQDatabase = AMQDatabase;
