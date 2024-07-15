import {Request} from 'express';
import {ResponsePrimitive} from "../../../shared/interfaces/response-primitive.interface";
import {HttpStatus} from "../../../shared/enums/http-status.enum";
import {Register} from "../dtos/register";
import {RequisitionBodyResponse} from "../models/requisition-body-response";

export class RegisterService {
    save(register: Register): ResponsePrimitive<RequisitionBodyResponse> {
        return {
            code: HttpStatus.OK,
            message: "Salvo com sucesso",
            data: Register.toDto(register)
        }
   }
}