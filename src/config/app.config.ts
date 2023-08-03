import * as dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit, { Options } from "express-rate-limit";
import compression from "compression";
import getConfig from "./config";
import session from "express-session";
import cookieParser from "cookie-parser";
import { ErrorHandlerMiddleware, NotFoundMiddleware, FaviconMiddleware } from "../middlewares";
import { StatusCode } from "../enums";
import { ResponseHandler, DBConnection } from "../utils";
import { ReqLog, Logger } from "../logger";
import winston from "winston";
class App {
    private app: Application;
    private logger: winston.Logger;
    constructor(private service: string, public environment: string) {
        this.service = `${service}-Service`;
        this.environment = environment;
        this.app = express();
        this.config();
        this.defaultRoute();
        this.logger = Logger(service);
    }
    private config(): void {
        const config = getConfig(this.environment);
        this.app.use(express.json());
        this.app.use(
            express.urlencoded({
                extended: false,
            })
        );
        this.app.disable("x-powered-by");
        this.app.use(helmet());
        this.app.use(helmet.noSniff());
        this.app.use(helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            }
        }));
        this.app.set("trust proxy", this.environment === "production");
        this.app.use(cors());
        this.app.use(
            rateLimit({
                windowMs: 1 * 60 * 1000,
                max: 5,
                skipSuccessfulRequests: true,
                handler: function (
                    req: Request,
                    res: Response,
                    next: NextFunction,
                    options: Options
                ) {
                    ResponseHandler.error(res, {
                        message: options.message,
                        statusCode: StatusCode.TOO_MANY_REQUEST,
                    });
                },
            })
        );
        this.app.use(compression());
        this.app.use(cookieParser(config.JWT_SECRET || "testing"));
        this.app.use(
            session({
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
            })
        );
        const apiLogMiddleware = new ReqLog(this.service).getMiddleware()
        this.app.use(apiLogMiddleware);
    }
    private defaultRoute(): void {
        //Test Route
        this.app.get("/", async (req, res) => {
            ResponseHandler.success(res, {
                message: `Teepha Flowers and Fabrics ${this.service} test route`,
                data: {
                    start: "Hello World",
                    ok: req.socket.remoteAddress,
                },
            });
        });
    }
    public getApp(): Application {
        return this.app;
    }
    private appMiddlewares(): void {
        //Favicon Middleware
        this.app.use(FaviconMiddleware);
        //Not Found Middleware
        this.app.use(NotFoundMiddleware);
        //Error Handler Middleware
        this.app.use(ErrorHandlerMiddleware);

    }

    public startServer(port: number): void {
        this.appMiddlewares();
        let connectDB = new DBConnection(this.environment, this.service)
        connectDB.startServer();
        this.app.listen(port, () => {
            this.logger.info(
                `Server is listening on port ${port} and running in ${process.env.APP_ENV} mode...`
            );
        }).on("error", (error: Error) => {
            this.logger.error(`Error starting server: ${error.message}`);
            process.exit(1);
        });
    }
}

export default App;

//Documentation
// import doc from "./docs";
// import swaggerUI from "swagger-ui-express";
// app.use("/docs", swaggerUI.serve, swaggerUI.setup(doc));
