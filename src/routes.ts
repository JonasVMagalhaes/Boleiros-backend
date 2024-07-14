import SignController from "./features/sign/sign.router";
import express from 'express';

export default class Routes {
    static router: express.Router = express.Router();

    static initializeRoutes() {
        new SignController(Routes.router).initializeRoutes();
    }
}
