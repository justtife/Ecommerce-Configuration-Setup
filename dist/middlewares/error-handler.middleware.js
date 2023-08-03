"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const enums_1 = require("../enums");
const errorHandler = (err, req, res, next) => {
    let customError = {
        message: err.message,
        statusCode: err.statusCode,
        code: err.errorCode,
    };
    //Different cases of errors
    switch (true) {
        case err.name === "ValidationError":
            // throw new Error.BadRequest(err.message);
            customError.message = err.message;
            customError.code = enums_1.StatusCode.BADREQUEST_ERROR;
            customError.statusCode = enums_1.StatusCode.BAD_REQUEST;
            break;
        case err.name === "TypeError":
            customError.message = "Type error";
            customError.statusCode = enums_1.StatusCode.BAD_REQUEST;
            customError.data = err.message;
            break;
        default:
            // throw new Error.Server(err.name || "An error occured, please try again later");
            customError.message =
                err.name || "An error occured, please try again later";
            customError.statusCode =
                err.statusCode || enums_1.StatusCode.INTERNAL_SERVER_ERROR;
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
    utils_1.ResponseHandler.error(res, {
        message: customError.message,
        data: customError.data,
        code: customError.code,
        statusCode: customError.statusCode
    });
};
exports.default = errorHandler;
