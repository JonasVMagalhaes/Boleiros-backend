import {Schema} from "mongoose";
import {ConfigSchema} from "../../config-schema";
import {SignInDB} from "../models/sign-in-db.interface";
import {ConfigurationsApp} from "../../../configurations/application";

export const signInSchema = new Schema<SignInDB>({
    id: {
        type: String,
        select: false,
        required: true,
        unique: true,
        immutable: true
    },
    idUser: {
        type: String,
        required: true,
        immutable: true
    },
    access_token: {
        type: String,
        index: true,
        required: true
    },
    expire_time: {
        type: Number,
        required: true,
        default: ConfigurationsApp.timeCache
    },
    createdDate: {
        type: Date,
        select: false,
        required: true,
        default: Date.now,
        immutable: true
    },
    modifiedDate: {
        type: Date,
        select: false,
        required: true,
        default: Date.now
    }
}, ConfigSchema);