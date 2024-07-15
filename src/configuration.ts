import express, {Express, Router} from "express";
import dotenv from "dotenv";

import HelmetMiddleware from './middlewares/helmet/helmet.middleware';
import CorsMiddleware from "./middlewares/cors/cors.middleware";
import ExpressSessionMiddleware from "./middlewares/express-session/express-session.middleware";

import SignRouter from "./features/sign/sign.router";

import {RoutesEnum} from "./shared/enums/routes.enum";
import RegisterRouter from "./features/register/register.router";

export default class Configuration {
    private router: Router;

    apply(app: express.Express): void {
        this.configureEnvironments();
        this.applyExpressConfiguration(app);
        this.configureMiddlewares(app);
        this.applyRoutes(app);
    }

    private applyExpressConfiguration(app: Express): void {
        app.use(express.json());
    }

    private configureMiddlewares(app: Express): void {
        app.use(ExpressSessionMiddleware.middleware);
        app.use(CorsMiddleware.middleware);
        app.use(HelmetMiddleware.middleware);
    }

    private applyRoutes(app: Express): void {
        this.router = express.Router();

        const signRouter: SignRouter = new SignRouter(this.router);
        app.use(RoutesEnum.EMPTY, signRouter.initializeRoutes().router);

        const registerRouter: RegisterRouter = new RegisterRouter(this.router);
        app.use(RoutesEnum.EMPTY, registerRouter.initializeRoutes().router);
    }

    configureEnvironments(): void {
        dotenv.config();
    }
}