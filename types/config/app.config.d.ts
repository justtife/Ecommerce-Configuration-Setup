import "express-async-errors";
import { Application } from "express";
declare class App {
    private service;
    environment: string;
    private app;
    private logger;
    constructor(service: string, environment: string);
    private config;
    private defaultRoute;
    getApp(): Application;
    private appMiddlewares;
    startServer(port: number): void;
}
export default App;
