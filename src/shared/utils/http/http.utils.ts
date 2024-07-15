import {ResponseType} from "../../interfaces/response-type.interface";
import express, { Response } from "express";

export class HttpUtils {
    static emitResponse<T>(res: Response, response: ResponseType<T>): express.Response<T> {
        const responseData : { message: string, data?: T } = {
            message: response.message,
            data: response.data
        };

        return res.status(response.code).json(responseData);
    }
}