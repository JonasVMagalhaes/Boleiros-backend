import express from 'express';
import {RegisterController} from "./register.controller";
import {RegisterValidatorService} from "./services/register-validation.service";

export default class RegisterRouter {
    constructor(readonly router: express.Router) { }

    initializeRoutes(): RegisterRouter {
        const signController: RegisterController = new RegisterController();
        const signValidatorService: RegisterValidatorService = new RegisterValidatorService();

        this.router.post('/', signValidatorService.handlePostValidator(), (req, res) => signController.handlePost(req, res));
        return this;
    }
}