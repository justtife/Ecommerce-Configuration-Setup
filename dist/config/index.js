"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.AppConfig = void 0;
var app_config_1 = require("./app.config");
Object.defineProperty(exports, "AppConfig", { enumerable: true, get: function () { return __importDefault(app_config_1).default; } });
var db_config_1 = require("./db.config");
Object.defineProperty(exports, "DB", { enumerable: true, get: function () { return __importDefault(db_config_1).default; } });
//# sourceMappingURL=index.js.map