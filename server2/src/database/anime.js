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
exports.__esModule = true;
var abstract_1 = require("./abstract");
var config_1 = require("../shared/config");
var SongData = /** @class */ (function (_super) {
    __extends(SongData, _super);
    function SongData(logger) {
        var _this = _super.call(this, config_1.SONG_LIST_PATH, logger) || this;
        _this._initSecondaryDb();
        return _this;
    }
    SongData.prototype._initSecondaryDb = function () {
        this._animeChoices = [];
        this._songChoices = [];
        this._songIds = [];
        for (var _i = 0, _a = this.db; _i < _a.length; _i++) {
            var song = _a[_i];
            this._addSongId(song);
            this._addAnimeChoice(song);
        }
        this._animeChoices = this._animeChoices.sort(this._sortChoices);
        this._songChoices = this._songChoices.sort(this._sortChoices);
    };
    SongData.prototype._addSongChoice = function (song) {
        var title = song['title'];
        if (!this._songChoices.includes(title)) {
            this._songChoices.push(title);
        }
    };
    SongData.prototype._addAnimeChoice = function (song) {
        for (var _i = 0, _a = song['anime']; _i < _a.length; _i++) {
            var anime = _a[_i];
            if (!this._animeChoices.includes(anime)) {
                this._animeChoices.push(anime);
            }
        }
    };
    SongData.prototype._addSongId = function (song) {
        var songId = song['songId'];
        if (this._songIds.includes(songId)) {
            throw new Error("Duplicate song id: " + songId);
        }
        else {
            this._songIds.push(songId);
        }
    };
    SongData.prototype._sortChoices = function (a, b) {
        if (a > b) {
            return 1;
        }
        return -1;
    };
    return SongData;
}(abstract_1.AbstractDataObject));
exports.SongData = SongData;
