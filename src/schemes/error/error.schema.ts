import mongoose, {Document, Schema} from 'mongoose';
import {HttpStatus} from "../../shared/enums/http-status.enum";
import {v4 as uuidv4} from 'uuid';

export interface ErrorDBModel {
    code: HttpStatus;
    pathError: string;
    method: string;
    payload: any;
    message: string;
}

abstract class ErrorDB extends Document implements ErrorDBModel {
    id: string;
    code: HttpStatus;
    pathError: string;
    method: string;
    payload: any;
    message: string;
    date: Date;
}

const errorSchema = new Schema<ErrorDB>({
    id: { type: String, required: true },
    code: { type: Number, required: true },
    pathError: { type: String, required: true },
    method: { type: String, required: true },
    payload: { type: Schema.Types.Mixed, required: true },
    message: { type: String, required: true },
    date: { type: Date, required: true },
});

const ErrorModel = mongoose.model<ErrorDB>('Error', errorSchema);

export default class ErrorDBAction {
    static create(error: ErrorDBModel): void {
        ErrorModel.create({
            id: uuidv4(),
            code: error.code,
            pathError: error.pathError,
            method: error.method,
            payload: error.payload,
            message: error.message,
            date: new Date()
        });
    }
};