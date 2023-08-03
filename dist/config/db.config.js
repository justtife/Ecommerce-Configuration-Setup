"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("./config"));
const sequelize = (env) => {
    const config = (0, config_1.default)(env);
    return new sequelize_1.Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASS, {
        host: config.DB_HOST,
        port: config.PORT,
        dialect: config.DIALECT,
        pool: {
            max: config.POOL.MAX,
            min: config.POOL.MIN,
            acquire: config.POOL.ACQUIRE,
            idle: config.POOL.IDLE
        }
    });
};
exports.default = sequelize;
// sequelize
//     .authenticate()
//     .then(() => {
//         logger.info("Connection to database has been established successfully");
//     })
//     .catch((err) => {
//         logger.error(`Unable to connect to database \n Error: ${err}`);
//     });
