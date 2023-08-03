"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.ReqLog = void 0;
var log_1 = require("./log");
Object.defineProperty(exports, "ReqLog", { enumerable: true, get: function () { return __importDefault(log_1).default; } });
var logger_1 = require("./logger");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return __importDefault(logger_1).default; } });
