import {Document} from "mongoose";

import {UserRole} from "../../../shared/enums/user-role.enum";
import {UserDBModel} from "./user-db-model.interface";

export abstract class UserDB extends Document implements UserDBModel {
    id: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    verifiedEmail: boolean;
    role: UserRole;
    active: boolean;
    createdDate: Date;
    modifiedDate: Date;
}