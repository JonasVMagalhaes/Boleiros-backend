import mongoose, {Document, Schema} from 'mongoose';
import {HttpStatus} from "../../shared/enums/http-status.enum";
import {v4 as uuidv4} from 'uuid';
import {Request} from "express";

export interface ErrorDBModel extends Document {
    id: string;
    code: HttpStatus,
    pathError: string;
    method: string;
    message: string;
    date: Date;
}

const errorSchema = new Schema<ErrorDBModel>({
    id: { type: String, required: true },
    code: { type: Number, required: true },
    pathError: { type: String, required: true },
    method: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, required: true },
});

const ErrorModel = mongoose.model<ErrorDBModel>('Error', errorSchema);

export default class ErrorDB {
    static create<T>(pathError: string, request: Request, errorCode: HttpStatus, errorMessage: string): void {
        ErrorModel.create({
            id: uuidv4(),
            code: errorCode,
            pathError: pathError,
            method: request.method,
            message: errorMessage,
            date: new Date()
        });
    }
};