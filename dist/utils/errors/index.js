"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = exports.Custom = exports.NotFound = exports.BadRequest = void 0;
var bad_request_error_1 = require("./bad-request.error");
Object.defineProperty(exports, "BadRequest", { enumerable: true, get: function () { return __importDefault(bad_request_error_1).default; } });
var not_found_error_1 = require("./not-found.error");
Object.defineProperty(exports, "NotFound", { enumerable: true, get: function () { return __importDefault(not_found_error_1).default; } });
var custom_error_1 = require("./custom.error");
Object.defineProperty(exports, "Custom", { enumerable: true, get: function () { return __importDefault(custom_error_1).default; } });
var server_error_1 = require("./server.error");
Object.defineProperty(exports, "Server", { enumerable: true, get: function () { return __importDefault(server_error_1).default; } });
