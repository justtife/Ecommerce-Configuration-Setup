const mainConfig: { [key: string]: any } = {
    development: {
        DB_NAME: process.env.DEV_DB_NAME as string,
        DB_USER: process.env.DEV_DB_USER as string,
        DB_PASS: process.env.DEV_DB_PASS as string,
        DB_HOST: process.env.DEV_DB_HOST as string,
        DB_PORT: (process.env.DEV_DB_PORT || 5432) as number,
        DIALECT: 'postgres',
        POOL: {
            MAX: 5,
            MIN: 0,
            ACQUIRE: 100000,
            IDLE: 10000,
        },
        LOGGING: false,
    },
    production: {
    },
    test: {
    },
};
export default function getConfig(env: string) {
    return mainConfig[env] || mainConfig["development"];
}
