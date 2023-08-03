export default class DatabaseManager {
    private readonly env;
    private readonly logger;
    constructor(env: string, service: string);
    private createDatabaseConnection;
    private closeDatabaseConnection;
    startServer(): Promise<void>;
}
