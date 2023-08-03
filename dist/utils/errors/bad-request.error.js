"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_1 = __importDefault(require("./custom.error"));
const enums_1 = require("../../enums");
class BadRequestError extends custom_error_1.default {
    constructor(message, name = "BadRequestError", statusCode = enums_1.StatusCode.BAD_REQUEST, errorCode = enums_1.StatusCode.BADREQUEST_ERROR) {
        super(message, statusCode, errorCode);
        this.name = name;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.name = name;
    }
}
exports.default = BadRequestError;
//# sourceMappingURL=bad-request.error.js.map