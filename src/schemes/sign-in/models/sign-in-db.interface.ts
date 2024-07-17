import {Document} from "mongoose";

import {SignInDBModel} from "./sign-in-db-model.interface";

export abstract class SignInDB extends Document implements SignInDBModel {
    id: string;
    idUser: string;
    access_token: string;
    expire_time: number;
    createdDate: Date;
    modifiedDate: Date;
}