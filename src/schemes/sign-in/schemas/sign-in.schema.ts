import {Schema} from "mongoose";
import {ConfigSchema} from "../../config-schema";
import {SignInDB} from "../models/sign-in-db.interface";

export const signInSchema = new Schema<SignInDB>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    idUser: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
        required: true
    },
    expire_time: {
        type: Number,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    modifiedDate: {
        type: Date,
        required: true
    }
}, ConfigSchema);