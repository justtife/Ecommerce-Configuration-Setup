"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
/**
 * API RESPONSE
 */
class Output {
    /**
     * SUCCESS RESPONSE FORMAT
     * @param res
     * @param param1
     */
    static success(res, { message, data, statusCode, token }) {
        const output = {
            status: "success",
            message,
            data,
            token,
            statusCode: statusCode || enums_1.StatusCode.OK,
            code: enums_1.StatusCode.SUCCESS_RESPONSE,
        };
        res.status(output.statusCode).json(output);
    }
    /**
     * ERROR RESPONSE FORMAT
     * @param res
     * @param param1
     */
    static error(res, { message, data, statusCode, code, status }) {
        const output = {
            status: status || "failed",
            message,
            data,
            statusCode: statusCode || enums_1.StatusCode.BAD_REQUEST,
            code: code || enums_1.StatusCode.ERROR_RESPONSE,
        };
        res.status(output.statusCode).json(output);
    }
}
exports.default = Output;
//# sourceMappingURL=response-handler.js.map