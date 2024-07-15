import express, { Response } from "express";
import {ResponsePrimitive} from "../../interfaces/response-primitive.interface";

export class HttpUtils {
    static emitResponse<T>(res: Response, response: ResponsePrimitive<T>): express.Response<T> {
        const responseData : { message: string, data?: T } = {
            message: response.message,
            data: response.data
        };

        return res.status(response.code).json(responseData);
    }
}