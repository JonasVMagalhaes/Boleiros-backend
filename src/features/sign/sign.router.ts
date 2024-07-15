import express from 'express';
import {SignController} from "./sign.controller";
import {SignValidatorService} from "./services/sign-validator.service";

export default class SignRouter {
    constructor(readonly router: express.Router) { }

    initializeRoutes(): SignRouter {
        const signController: SignController = new SignController();
        const signValidatorService: SignValidatorService = new SignValidatorService();

        this.router.post('/', signValidatorService.handlePostValidator(), (req, res) => signController.handlePost(req, res));
        return this;
    }
}