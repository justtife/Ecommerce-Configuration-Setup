import { OutputInterface } from "../interfaces";
import { Response } from "express";
/**
 * API RESPONSE
 */
declare class Output {
    /**
     * SUCCESS RESPONSE FORMAT
     * @param res
     * @param param1
     */
    static success(res: Response, { message, data, statusCode, token }: OutputInterface): void;
    /**
     * ERROR RESPONSE FORMAT
     * @param res
     * @param param1
     */
    static error(res: Response, { message, data, statusCode, code, status }: OutputInterface): void;
}
export default Output;
