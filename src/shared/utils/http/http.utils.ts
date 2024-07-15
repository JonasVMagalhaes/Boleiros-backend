import express, { Response } from "express";
import {ResponsePrimitive} from "../../interfaces/response-primitive.interface";

export class HttpUtils {
    static emitResponse<T>(response: Response, result: ResponsePrimitive<T>): express.Response<T> {
        const responseData : { message: string, data?: T } = {
            message: result.message,
            data: result.data
        };

        return response.status(result.code).json(responseData);
    }
}