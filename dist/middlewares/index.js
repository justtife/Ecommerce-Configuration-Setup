"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaviconMiddleware = exports.NotFoundMiddleware = exports.ErrorHandlerMiddleware = void 0;
var error_handler_middleware_1 = require("./error-handler.middleware");
Object.defineProperty(exports, "ErrorHandlerMiddleware", { enumerable: true, get: function () { return __importDefault(error_handler_middleware_1).default; } });
var not_found_middleware_1 = require("./not-found.middleware");
Object.defineProperty(exports, "NotFoundMiddleware", { enumerable: true, get: function () { return __importDefault(not_found_middleware_1).default; } });
var favicon_middleware_1 = require("./favicon.middleware");
Object.defineProperty(exports, "FaviconMiddleware", { enumerable: true, get: function () { return __importDefault(favicon_middleware_1).default; } });
