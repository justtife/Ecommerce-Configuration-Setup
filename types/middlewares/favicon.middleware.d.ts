import { Request, Response, NextFunction } from "express";
declare const faviconmiddleware: (req: Request, res: Response, next: NextFunction) => void;
export default faviconmiddleware;
