import { Request, Response, NextFunction } from "express";
const faviconmiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.url === '/favicon.ico') {
        res.status(204).end();
    }
    else {
        next();
    }
}
export default faviconmiddleware;