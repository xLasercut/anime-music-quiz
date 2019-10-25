"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var AbstractDataObject = /** @class */ (function () {
    function AbstractDataObject(filepath, logger) {
        this._filepath = filepath;
        this._logger = logger;
        this._initDb();
    }
    AbstractDataObject.prototype._initDb = function () {
        this.db = this._readFile();
    };
    AbstractDataObject.prototype._readFile = function () {
        return JSON.parse(fs.readFileSync(this._filepath, { encoding: 'utf-8' }));
    };
    AbstractDataObject.prototype._writeFile = function () {
        fs.writeFileSync(this._filepath, JSON.stringify(this.db, null, 2));
    };
    return AbstractDataObject;
}());
exports.AbstractDataObject = AbstractDataObject;
var AbstractRequestHandler = /** @class */ (function () {
    function AbstractRequestHandler(logger, db, emitter) {
        this._logger = logger;
        this._db = db;
        this._emitter = emitter;
    }
    return AbstractRequestHandler;
}());
exports.AbstractRequestHandler = AbstractRequestHandler;
