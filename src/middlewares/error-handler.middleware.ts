import { Request, Response, NextFunction } from "express";
import { Error, ResponseHandler } from "../utils";
import { OutputInterface } from "../interfaces";
import { StatusCode } from "../enums";
const errorHandler = (
    err: Error.Custom,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let customError: Omit<OutputInterface, "status"> = {
        message: err.message,
        statusCode: err.statusCode,
        code: err.errorCode,
    };
    //Different cases of errors
    switch (true) {
        case err.name === "ValidationError":
            // throw new Error.BadRequest(err.message);
            customError.message = err.message;
            customError.code = StatusCode.BADREQUEST_ERROR;
            customError.statusCode = StatusCode.BAD_REQUEST;
            break;
        case err.name === "TypeError":
            customError.message = "Type error";
            customError.statusCode = StatusCode.BAD_REQUEST;
            customError.data = err.message;
            break;
        default:
            // throw new Error.Server(err.name || "An error occured, please try again later");
            customError.message =
                err.name || "An error occured, please try again later";
            customError.statusCode =
                err.statusCode || StatusCode.INTERNAL_SERVER_ERROR;
            customError.data = err.message;
            customError.code = err.errorCode;
            break;
    }
    // console.log("-----Error-------");
    // console.log(err);
    // console.log("-----Error Message-------");
    // console.log(err.message);
    // console.log("-----Error Name-------");
    // console.log(err.name);
    // console.log("------------");
    console.log(err);
    ResponseHandler.error(res, {
        message: customError.message,
        data: customError.data,
        code: customError.code,
        statusCode: customError.statusCode
    })
};
export default errorHandler;
