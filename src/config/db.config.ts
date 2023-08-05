import { Sequelize } from "sequelize";
import getConfig from "./config";
const sequelize = (env: string): Sequelize => {
    const config = getConfig(env);
    return new Sequelize(
        config.DB_NAME,
        config.DB_USER,
        config.DB_PASS,
        {
            host: config.DB_HOST,
            port: config.PORT,
            dialect: config.DIALECT,
            pool: {
                max: config.POOL.MAX,
                min: config.POOL.MIN,
                acquire: config.POOL.ACQUIRE,
                idle: config.POOL.IDLE
            },
            retry: { max: 5, timeout: 5000 }
        }
    );
}
export default sequelize
// sequelize
//     .authenticate()
//     .then(() => {
//         logger.info("Connection to database has been established successfully");
//     })
//     .catch((err) => {
//         logger.error(`Unable to connect to database \n Error: ${err}`);
//     });

