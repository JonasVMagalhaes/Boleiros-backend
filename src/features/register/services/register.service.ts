import {ResponsePrimitive} from "../../../shared/interfaces/response-primitive.interface";
import {HttpStatus} from "../../../shared/enums/http-status.enum";
import {Register} from "../dtos/register";
import {RequisitionBodyResponse} from "../models/requisition-body-response";
import RegisterDBActions from "../../../schemes/register/register.schema";

export class RegisterService {
    save(register: Register): ResponsePrimitive<RequisitionBodyResponse> {

        RegisterDBActions.create({
            username: register.username,
            password: register.password,
            email: register.email
        });

        return {
            code: HttpStatus.OK,
            message: "Salvo com sucesso",
            data: Register.toDto(register)
        }
   }
}