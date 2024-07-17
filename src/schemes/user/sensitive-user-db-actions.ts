import {UserDatabase} from "./database/user.database";

export class SensitiveUserDBActions {
    private static readonly userDatabase: UserDatabase = new UserDatabase();

    static findItemById(id: string) {
        return this.userDatabase.sensitiveUserModel.findOne({id}).select('id username email phone');
    }
};