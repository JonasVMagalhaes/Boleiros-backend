import { v4 as uuidv4 } from "uuid";

import {SignInDatabase} from "./database/signIn.database";
import {JwtUtils} from "../../shared/utils/jwt/jwt.utils";
import {ConfigurationsApp} from "../../configurations/application";
import {SignInDBModel} from "./models/sign-in-db-model.interface";

export class SignInDbActions {
    private static readonly Database: SignInDatabase = new SignInDatabase();

    static save(signIn: SignInDBModel) {
        return this.Database.signInModel.create({
            id: uuidv4(),
            idUser: signIn.idUser,
            access_token: JwtUtils.generate({ id: signIn.idUser }),
            expire_time: ConfigurationsApp.timeCache,
            createdDate: new Date,
            modifiedDate: new Date
        });
    }
};