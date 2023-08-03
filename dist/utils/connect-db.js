"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const logger_1 = require("../logger");
class DatabaseManager {
    constructor(env, service) {
        this.env = env;
        this.logger = (0, logger_1.Logger)(service);
    }
    createDatabaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.DB)(this.env).authenticate()
                .then(() => {
                this.logger.info("Connection to database has been established successfully");
            })
                .catch((error) => {
                this.logger.error(`Unable to connect to the database \n ${error}`);
                process.exit(1);
            });
        });
    }
    closeDatabaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.DB)(this.env).close()
                .then(() => {
                this.logger.info("Database connection closed.");
                process.exit(0);
            })
                .catch((error) => {
                this.logger.error(`Error closing database connection: ${error.message}`);
                process.exit(1);
            });
        });
    }
    startServer() {
        return __awaiter(this, void 0, void 0, function* () {
            // Create database connection
            yield this.createDatabaseConnection();
            // Gracefully close the database connection when the process receives a termination signal
            process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
                yield this.closeDatabaseConnection();
            }));
        });
    }
}
exports.default = DatabaseManager;
//# sourceMappingURL=connect-db.js.map