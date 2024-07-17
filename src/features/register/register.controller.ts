import {Result, ValidationError, validationResult} from "express-validator";

import {HttpUtils} from "../../shared/utils/http/http.utils";
import {HttpStatus} from "../../shared/enums/http-status.enum";
import {Request, Response} from "express";
import {ResponsePrimitive} from "../../shared/interfaces/response-primitive.interface";
import {Register} from "./dtos/register";
import ErrorDBAction from "../../schemes/error/error.schema";
import {RegisterCreateUsecase} from "./usecases/register-create.usecase";
import {ResponsePostRegister} from "./models/response-post-register";

export class RegisterController {
    async handlePost(request: Request, response: Response) {
        const registerUsecase: RegisterCreateUsecase = new RegisterCreateUsecase(request, Register.fromDto(request.body));

        const errors: Result<ValidationError> = validationResult(request);
        if (!errors.isEmpty()) {
            return HttpUtils.emitResponse(response, { code: HttpStatus.BAD_REQUEST, message: errors.array()[0].msg });
        }

        try {
            const result: ResponsePrimitive<{} | ResponsePostRegister> = await registerUsecase.execute();
            return HttpUtils.emitResponse(response, result);
        } catch (err) {
            ErrorDBAction.create({
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                pathError: RegisterController.name,
                method: request.method,
                payload: request.body,
                message: err.stack
            });
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
        }
    }
}