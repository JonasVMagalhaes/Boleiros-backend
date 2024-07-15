import {Result, ValidationError, validationResult} from "express-validator";
import {HttpUtils} from "../../shared/utils/http/http.utils";
import {HttpStatus} from "../../shared/enums/http-status.enum";
import {Request, Response} from "express";
import {RegisterService} from "./services/register.service";
import {ResponsePrimitive} from "../../shared/interfaces/response-primitive.interface";
import {Register} from "./dtos/register";
import {RequisitionBodyResponse} from "./models/requisition-body-response";

export class RegisterController {
    private readonly service: RegisterService = new RegisterService();

    handlePost(request: Request, response: Response) {
        const errors: Result<ValidationError> = validationResult(request);
        if (!errors.isEmpty()) {
            return HttpUtils.emitResponse(response, { code: HttpStatus.BAD_REQUEST, message: errors.array()[0].msg });
        }

        const result: ResponsePrimitive<RequisitionBodyResponse> = this.service.save(Register.fromDto(request.body));
        return HttpUtils.emitResponse(response, result);
    }
}