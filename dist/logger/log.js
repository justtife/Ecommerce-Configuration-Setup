"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
/**
 * API Request Logger
 */
class LoggerMiddleware {
    /**
     *
     * @param serviceName
     */
    constructor(serviceName) {
        this.serviceName = serviceName;
        this.serviceName = serviceName;
        this.logger = (0, logger_1.default)(serviceName);
    }
    logRequest(req) {
        this.logger.info(`Called: ${req.path}`);
    }
    logResponse(req, res) {
        const { statusCode, statusMessage } = res;
        const { method, originalUrl, } = req;
        let logMessage = `[${method}] ${originalUrl}: ${statusCode} ${statusMessage}`;
        if (statusCode >= 400 && statusCode < 500) {
            this.logger.warn(logMessage);
        }
        else if (statusCode >= 500) {
            this.logger.error(logMessage);
        }
        else {
            this.logger.info(logMessage);
        }
    }
    onFinished(req, res) {
        this.logResponse(req, res);
    }
    getMiddleware() {
        return (req, res, next) => {
            this.logRequest(req);
            res.on("finish", () => this.onFinished(req, res));
            next();
        };
    }
}
exports.default = LoggerMiddleware;
