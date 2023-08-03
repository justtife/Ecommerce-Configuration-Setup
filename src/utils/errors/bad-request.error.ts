import CustomError from "./custom.error";
import { StatusCode } from "../../enums";
export default class BadRequestError extends CustomError {
    constructor(
        message: string,
        readonly name: string = "BadRequestError",
        readonly statusCode: number = StatusCode.BAD_REQUEST,
        readonly errorCode: number = StatusCode.BADREQUEST_ERROR
    ) {
        super(message, statusCode, errorCode);
        this.name = name;
    }
}
