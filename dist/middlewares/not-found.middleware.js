"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const notFound = (req) => {
    throw new utils_1.Error.NotFound(`Route ${req.originalUrl} does not exist`);
};
exports.default = notFound;
