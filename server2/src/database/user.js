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
var UserData = /** @class */ (function (_super) {
    __extends(UserData, _super);
    function UserData(name, filepath, logger) {
        var _this = _super.call(this, filepath, logger) || this;
        _this._name = name;
        return _this;
    }
    UserData.prototype.addSong = function (songId) {
        this.db.push(songId);
        this._writeFile();
    };
    UserData.prototype.removeSong = function (songId) {
        var i = this.db.indexOf(songId);
        if (i > -1) {
            this.db.splice(i, 1);
            this._writeFile();
        }
    };
    UserData.prototype.validateAddSongId = function (songId) {
    };
    UserData.prototype.validateRemoveSongId = function (songId) {
    };
    return UserData;
}(abstract_1.AbstractDataObject));
exports.UserData = UserData;
