import { DB } from "../config";
import { Logger } from "../logger";
export default class DatabaseManager {
    private readonly env: string;
    private readonly logger;

    constructor(env: string, service: string) {
        this.env = env;
        this.logger = Logger(service);
    }

    private createDatabaseConnection() {
        DB(this.env).authenticate()
            .then(() => {
                this.logger.info("Connection to database has been established successfully");
            })
            .catch((error: any) => {
                this.logger.error(`Unable to connect to database \n ${error}`);
                process.exit(1);
            })
    }

    private async closeDatabaseConnection() {
        await DB(this.env).close()
            .then(() => {
                this.logger.info("Database connection closed.");
                process.exit(0);
            })
            .catch((error: any) => {
                this.logger.error(`Error closing database connection: ${error.message}`);
                process.exit(1);
            })
    }

    public async startServer() {
        // Create database connection
        await this.createDatabaseConnection();

        // Gracefully close the database connection when the process receives a termination signal
        process.on('SIGINT', async () => {
            await this.closeDatabaseConnection();
        });
    }
}

