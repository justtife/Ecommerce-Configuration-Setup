import CustomError from "./custom.error";
export default class BadRequestError extends CustomError {
    readonly name: string;
    readonly statusCode: number;
    readonly errorCode: number;
    constructor(message: string, name?: string, statusCode?: number, errorCode?: number);
}
