"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, label, printf, metadata, colorize } = winston_1.format;
const path_1 = __importDefault(require("path"));
//Logger output Format for file(error messages)
const logFormat = (serviceName) => printf((_a) => {
    var { level, label, timestamp, message } = _a, meta = __rest(_a, ["level", "label", "timestamp", "message"]);
    return `[${level}] ${timestamp} ${label} [${serviceName}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ""}`;
});
//Logger output Format for console(info,warn,error messages)
const consoleFormat = (serviceName) => printf(({ level, label, timestamp, message }) => {
    return `[${level}] ${timestamp} ${label} [${serviceName}]: ${message}`;
});
const logger = (serviceName) => {
    return (0, winston_1.createLogger)({
        transports: [
            //Console - Log all level
            new winston_1.transports.Console({
                format: combine(colorize({ all: false, level: true }), consoleFormat(serviceName)),
            }),
            //File - Log error
            new winston_1.transports.File({
                level: "error",
                filename: path_1.default.join(__dirname, `${serviceName}-logger.log`),
                format: logFormat(serviceName),
            }),
        ],
        format: combine(label({ label: "Scissors-Logger" }), timestamp({ format: "YY-MM-DD HH:mm:ss" }), metadata({ fillExcept: ["message", "level", "timestamp", "label"] }), logFormat(serviceName)),
    });
};
exports.default = logger;
//# sourceMappingURL=logger.js.map