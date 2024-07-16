import mongoose, {Document, Schema} from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import {JwtUtils} from "../../shared/utils/jwt/jwt.utils";
import {ConfigurationsApp} from "../../configurations/application";

export interface SignInDBModel {
    idUser: string;
}

abstract class SignInDB extends Document implements SignInDBModel {
    id: string;
    idUser: string;
    access_token: string;
    expire_time: number;
    createdDate: Date;
    modifiedDate: Date;
}

const signInSchema = new Schema<SignInDB>({
    id: { type: String, required: true },
    idUser: { type: String, required: true },
    access_token: { type: String, required: true },
    expire_time: { type: Number, required: true },
    createdDate: { type: Date, required: true },
    modifiedDate: { type: Date, required: true },
});

const SignInModel = mongoose.model<SignInDB>('signIn', signInSchema);

export default class SignInDBActions extends SignInModel {
    static save(signIn: SignInDBModel) {
        return SignInModel.create({
            id: uuidv4(),
            idUser: signIn.idUser,
            access_token: JwtUtils.generate({ id: signIn.idUser }),
            expire_time: ConfigurationsApp.timeCache,
            createdDate: new Date,
            modifiedDate: new Date
        });
    }
};