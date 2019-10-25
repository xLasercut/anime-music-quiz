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
var init_1 = require("../init");
var AMQDbError = /** @class */ (function (_super) {
    __extends(AMQDbError, _super);
    function AMQDbError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'AMQDbError';
        return _this;
    }
    return AMQDbError;
}(Error));
exports.AMQDbError = AMQDbError;
function exceptionHandler(socket, f) {
    return function () {
        try {
            return f.apply(this, arguments);
        }
        catch (e) {
            if (e.name === 'AMQDbError') {
                init_1.msgEmitter.notification('error', e.message, socket);
            }
            else {
                init_1.logger.writeLog('SERVER004', { stack: e.stack });
            }
        }
    };
}
exports.exceptionHandler = exceptionHandler;
