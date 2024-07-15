import {Result, ValidationError, validationResult} from "express-validator";
import {HttpUtils} from "../../shared/utils/http/http.utils";
import {HttpStatus} from "../../shared/enums/http-status.enum";
import {Request, Response} from "express";

export class SignController {
    handlePost(request: Request, response: Response) {
        const errors: Result<ValidationError> = validationResult(request);
        if (!errors.isEmpty()) {
            return HttpUtils.emitResponse(response, { code: HttpStatus.BAD_REQUEST, message: errors.array()[0].msg });
        }
    }
}
