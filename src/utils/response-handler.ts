import { StatusCode } from "../enums";
import { OutputInterface } from "../interfaces";
import { Response } from "express";
/**
 * API RESPONSE
 */
class Output {
    /**
     * SUCCESS RESPONSE FORMAT
     * @param res 
     * @param param1 
     */
    static success(
        res: Response,
        { message, data, statusCode, token }: OutputInterface
    ): void {
        const output: OutputInterface = {
            status: "success",
            message,
            data,
            token,
            statusCode: statusCode || StatusCode.OK,
            code: StatusCode.SUCCESS_RESPONSE,
        };
        res.status(output.statusCode as number).json(output);
    }
    /**
     * ERROR RESPONSE FORMAT
     * @param res 
     * @param param1 
     */
    static error(
        res: Response,
        { message, data, statusCode, code, status }: OutputInterface
    ): void {
        const output: OutputInterface = {
            status: status || "failed",
            message,
            data,
            statusCode: statusCode || StatusCode.BAD_REQUEST,
            code: code || StatusCode.ERROR_RESPONSE,
        };
        res.status(output.statusCode as number).json(output);
    }
}

export default Output;
