import express from "express";
import dotenv from "dotenv";

import HelmetMiddleware from './middlewares/helmet/helmet.middleware';
import CorsMiddleware from "./middlewares/cors/cors.middleware";
import ExpressSessionMiddleware from "./middlewares/express-session/express-session.middleware";
import Routes from "./routes";

export default class Configuration {
    constructor(private readonly application: express.Application) {
        this.start();
    }

    start(): void {
        this.configureMiddlewares();
        this.configureRoutes();
        this.configureEnvironments();
    }

    configureMiddlewares(): void {
        this.application.use(ExpressSessionMiddleware.middleware);
        this.application.use(CorsMiddleware.middleware);
        this.application.use(HelmetMiddleware.middleware);
    }

    configureRoutes(): void {
        this.application.use(Routes.router);
        Routes.initializeRoutes();
    }

    configureEnvironments(): void {
        dotenv.config();
    }
}