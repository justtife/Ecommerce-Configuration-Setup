import { Request, Response, NextFunction, RequestHandler } from "express";
import loggerService from "./logger";

/**
 * API Request Logger
 */
class LoggerMiddleware {
    private logger: any;
    /**
     * 
     * @param serviceName 
     */
    constructor(public serviceName: string) {
        this.serviceName = serviceName;
        this.logger = loggerService(serviceName);
    }

    private logRequest(req: Request): void {
        this.logger.info(`Called: ${req.path}`);
    }

    private logResponse(req: Request, res: Response): void {
        const { statusCode, statusMessage } = res;
        const { method, originalUrl, } = req;
        let logMessage = `[${method}] ${originalUrl}: ${statusCode} ${statusMessage}`;

        if (statusCode >= 400 && statusCode < 500) {
            this.logger.warn(logMessage);
        } else if (statusCode >= 500) {
            this.logger.error(logMessage);
        } else {
            this.logger.info(logMessage);
        }
    }

    private onFinished(req: Request, res: Response): void {
        this.logResponse(req, res);
    }

    public getMiddleware(): RequestHandler {
        return (req: Request, res: Response, next: NextFunction): void => {
            this.logRequest(req);
            res.on("finish", () => this.onFinished(req, res));
            next();
        };
    }
}

export default LoggerMiddleware;
