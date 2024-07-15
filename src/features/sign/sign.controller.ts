import {Result, ValidationError, validationResult} from "express-validator";
import {HttpStatus} from "../../shared/enums/http-status.enum";
import {Request, Response} from "express";
import {HttpUtils} from "../../shared/utils/http/http.utils";
import ErrorDBAction from "../../schemes/error/error.schema";

export class SignController {
    handlePost(request: Request, response: Response) {
        const errors: Result<ValidationError> = validationResult(request);
        if (!errors.isEmpty()) {
            return HttpUtils.emitResponse(response, { code: HttpStatus.BAD_REQUEST, message: errors.array()[0].msg });
        }

        try {

        } catch (err) {
            ErrorDBAction.create({
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                pathError: SignController.name,
                method: request.method,
                payload: request.body,
                message: err.stack
            });
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
        }
    }
}
