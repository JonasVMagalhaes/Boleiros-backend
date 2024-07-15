import {HttpUtils} from "./http.utils";
import express, {Request, Response} from "express";
import {ResponsePrimitive} from "../../interfaces/response-primitive.interface";
import ErrorModel from "../../../schemes/error/error.schema";
import { v4 as uuidv4 } from 'uuid';

export class HttpValidatorErrorUtils extends HttpUtils {
    static emit<T>(request: Request, response: Response, result: ResponsePrimitive<T> ): express.Response<T> {
        ErrorModel.create({
            id: uuidv4(),
            message: result.message,
            type: result.code,
            primitive: request.url,
            className: HttpValidatorErrorUtils.name,
            methodName: this.emit.name,
            date: new Date()
        });

        return super.emitResponse<T>(response, result);
    }
}