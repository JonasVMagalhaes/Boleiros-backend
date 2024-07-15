import express, {Request, Response} from 'express';
import {SignController} from "./sign.controller";
import {SignValidatorService} from "./services/sign-validator.service";
import {RoutesEnum} from "../../shared/enums/routes.enum";

export default class SignRouter {
    constructor(readonly router: express.Router) { }

    initializeRoutes(): SignRouter {
        const signController: SignController = new SignController();
        const signValidatorService: SignValidatorService = new SignValidatorService();

        this.router.post(RoutesEnum.SIGN, signValidatorService.handlePostValidator(),
            (req: Request, res: Response) => signController.handlePost(req, res));
        return this;
    }
}