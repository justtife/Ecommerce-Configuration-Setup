"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mainConfig = {
    development: {
        DB_NAME: process.env.DEV_DB_NAME,
        DB_USER: process.env.DEV_DB_USER,
        DB_PASS: process.env.DEV_DB_PASS,
        DB_HOST: process.env.DEV_DB_HOST,
        DB_PORT: (process.env.DEV_DB_PORT || 5432),
        DIALECT: 'postgres',
        POOL: {
            MAX: 5,
            MIN: 0,
            ACQUIRE: 100000,
            IDLE: 10000,
        },
        LOGGING: false,
    },
    production: {},
    test: {},
};
function getConfig(env) {
    return mainConfig[env] || mainConfig["development"];
}
exports.default = getConfig;
//# sourceMappingURL=config.js.map