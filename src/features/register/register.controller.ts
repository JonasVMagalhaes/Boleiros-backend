import {Result, ValidationError, validationResult} from "express-validator";
import {HttpUtils} from "../../shared/utils/http/http.utils";
import {HttpStatus} from "../../shared/enums/http-status.enum";
import {Request, Response} from "express";
import {RegisterService} from "./services/register.service";
import {ResponsePrimitive} from "../../shared/interfaces/response-primitive.interface";
import {Register} from "./dtos/register";
import {RequisitionBodyResponse} from "./models/requisition-body-response";
import ErrorDBAction from "../../schemes/error/error.schema";

export class RegisterController {
    async handlePost(request: Request, response: Response) {
        const service: RegisterService = new RegisterService(request, Register.fromDto(request.body));

        const errors: Result<ValidationError> = validationResult(request);
        if (!errors.isEmpty()) {
            return HttpUtils.emitResponse(response, { code: HttpStatus.BAD_REQUEST, message: errors.array()[0].msg });
        }

        try {
            const result: ResponsePrimitive<RequisitionBodyResponse> = await service.save();
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