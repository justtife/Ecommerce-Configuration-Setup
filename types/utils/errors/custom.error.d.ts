export default class CustomError extends Error {
    statusCode: number;
    errorCode: number;
    protected constructor(message: string, statusCode: number, errorCode: number);
}
