import {Result, ValidationError, validationResult} from "express-validator";
import {HttpStatus} from "../../shared/enums/http-status.enum";
import {Request, Response} from "express";
import {HttpValidatorErrorUtils} from "../../shared/utils/http/http-validator-error.utils";

export class SignController {
    handlePost(request: Request, response: Response) {
        const errors: Result<ValidationError> = validationResult(request);
        if (!errors.isEmpty()) {
            return HttpValidatorErrorUtils.emit(request, response, { code: HttpStatus.BAD_REQUEST, message: errors.array()[0].msg });
        }
    }
}
