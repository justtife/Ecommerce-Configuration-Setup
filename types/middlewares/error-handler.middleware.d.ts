import { Request, Response, NextFunction } from "express";
import { Error } from "../utils";
declare const errorHandler: (err: Error.Custom, req: Request, res: Response, next: NextFunction) => void;
export default errorHandler;
