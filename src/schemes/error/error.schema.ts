import mongoose, {Document, Schema} from 'mongoose';
import {HttpStatus} from "../../shared/enums/http-status.enum";

export interface ErrorDBModel extends Document {
    id: string;
    type: HttpStatus,
    primitive: string;
    className: string;
    methodName: string;
    message: string;
    date: Date;
}

const errorSchema = new Schema<ErrorDBModel>({
    id: { type: String, required: true },
    type: { type: Number, required: true },
    primitive: { type: String, required: true },
    className: { type: String, required: true },
    methodName: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, required: true },
});

const ErrorDB = mongoose.model<ErrorDBModel>('Error', errorSchema);
export default ErrorDB;