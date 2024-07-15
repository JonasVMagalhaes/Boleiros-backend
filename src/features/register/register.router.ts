import express, {Request, Response} from 'express';
import {RegisterController} from "./register.controller";
import {RegisterValidatorService} from "./services/register-validation.service";
import {RoutesEnum} from "../../shared/enums/routes.enum";

export default class RegisterRouter {
    constructor(readonly router: express.Router) { }

    initializeRoutes(): RegisterRouter {
        const registerController: RegisterController = new RegisterController();
        const registerValidatorService: RegisterValidatorService = new RegisterValidatorService();

        this.router.post(RoutesEnum.REGISTER, registerValidatorService.handlePostValidator(),
            (req: Request, res: Response) => registerController.handlePost(req, res));
        return this;
    }
}