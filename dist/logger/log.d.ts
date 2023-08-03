import { RequestHandler } from "express";
/**
 * API Request Logger
 */
declare class LoggerMiddleware {
    serviceName: string;
    private logger;
    /**
     *
     * @param serviceName
     */
    constructor(serviceName: string);
    private logRequest;
    private logResponse;
    private onFinished;
    getMiddleware(): RequestHandler;
}
export default LoggerMiddleware;
