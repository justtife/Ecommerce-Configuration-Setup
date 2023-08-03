"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faviconmiddleware = (req, res, next) => {
    if (req.url === '/favicon.ico') {
        res.status(204).end();
    }
    else {
        next();
    }
};
exports.default = faviconmiddleware;
//# sourceMappingURL=favicon.middleware.js.map