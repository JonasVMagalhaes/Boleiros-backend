import { v4 as uuidv4 } from 'uuid';
import {UserDBModel} from "./models/user-db-model.interface";
import {UserDatabase} from "./database/user.database";

export class UserDBActions {
    private static readonly userDatabase: UserDatabase = new UserDatabase();

    static save(user: UserDBModel) {
        return this.userDatabase.userModel.create({
            id: uuidv4(),
            username: user.username,
            email: user.email,
            password: user.password,
            phone: user.phone
        });
    }

    static findItemById(id: string) {
        return this.userDatabase.userModel.findOne({id}).select('id username email');
    }

    static findUserByUsername(username: string) {
        return this.userDatabase.userModel.findOne({username}).select('id');
    }

    static findUserByEmail(email: string) {
        return this.userDatabase.userModel.findOne({email}).select('id');
    }

    static findVerifiedEmailById(id: string) {
        return this.userDatabase.userModel.findOne({id}).select('verifiedEmail');
    }
};