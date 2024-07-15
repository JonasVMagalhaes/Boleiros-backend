import {HttpStatus} from "../enums/http-status.enum";

export interface ResponsePrimitive<T> {
    code: HttpStatus,
    message: string,
    data?: T
}