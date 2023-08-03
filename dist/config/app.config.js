"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const compression_1 = __importDefault(require("compression"));
const config_1 = __importDefault(require("./config"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const middlewares_1 = require("../middlewares");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
const logger_1 = require("../logger");
class App {
    constructor(service, environment) {
        this.service = service;
        this.environment = environment;
        this.service = `${service}-Service`;
        this.environment = environment;
        this.app = (0, express_1.default)();
        this.config();
        this.defaultRoute();
        this.logger = (0, logger_1.Logger)(service);
    }
    config() {
        const config = (0, config_1.default)(this.environment);
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({
            extended: false,
        }));
        this.app.disable("x-powered-by");
        this.app.use((0, helmet_1.default)());
        this.app.use(helmet_1.default.noSniff());
        this.app.use(helmet_1.default.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            }
        }));
        this.app.set("trust proxy", this.environment === "production");
        this.app.use((0, cors_1.default)());
        this.app.use((0, express_rate_limit_1.default)({
            windowMs: 1 * 60 * 1000,
            max: 5,
            skipSuccessfulRequests: true,
            handler: function (req, res, next, options) {
                utils_1.ResponseHandler.error(res, {
                    message: options.message,
                    statusCode: enums_1.StatusCode.TOO_MANY_REQUEST,
                });
            },
        }));
        this.app.use((0, compression_1.default)());
        this.app.use((0, cookie_parser_1.default)(config.JWT_SECRET || "testing"));
        this.app.use((0, express_session_1.default)({
            name: config.SESSION_NAME || "testing",
            secret: config.SESSION_SECRET || "testing",
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 3 * 60 * 60 * 1000,
                signed: true,
                httpOnly: true,
                secure: this.environment === "production",
            },
        }));
        const apiLogMiddleware = new logger_1.ReqLog(this.service).getMiddleware();
        this.app.use(apiLogMiddleware);
    }
    defaultRoute() {
        //Test Route
        this.app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            utils_1.ResponseHandler.success(res, {
                message: `Teepha Flowers and Fabrics ${this.service} test route`,
                data: {
                    start: "Hello World",
                    ok: req.socket.remoteAddress,
                },
            });
        }));
    }
    getApp() {
        return this.app;
    }
    appMiddlewares() {
        //Favicon Middleware
        this.app.use(middlewares_1.FaviconMiddleware);
        //Not Found Middleware
        this.app.use(middlewares_1.NotFoundMiddleware);
        //Error Handler Middleware
        this.app.use(middlewares_1.ErrorHandlerMiddleware);
    }
    startServer(port) {
        this.appMiddlewares();
        let connectDB = new utils_1.DBConnection(this.environment, this.service);
        connectDB.startServer();
        this.app.listen(port, () => {
            this.logger.info(`Server is listening on port ${port} and running in ${process.env.APP_ENV} mode...`);
        }).on("error", (error) => {
            this.logger.error(`Error starting server: ${error.message}`);
            process.exit(1);
        });
    }
}
exports.default = App;
//Documentation
// import doc from "./docs";
// import swaggerUI from "swagger-ui-express";
// app.use("/docs", swaggerUI.serve, swaggerUI.setup(doc));
